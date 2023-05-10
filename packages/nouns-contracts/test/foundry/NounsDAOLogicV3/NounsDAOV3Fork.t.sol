// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import 'forge-std/Test.sol';
import { NounsDAOLogicV3BaseTest } from './NounsDAOLogicV3BaseTest.sol';
import { ForkDAODeployerMock } from '../helpers/ForkDAODeployerMock.sol';
import { ERC20Mock } from '../helpers/ERC20Mock.sol';
import { NounsDAOV3Fork } from '../../../contracts/governance/fork/NounsDAOV3Fork.sol';
import { NounsDAOForkEscrow } from '../../../contracts/governance/fork/NounsDAOForkEscrow.sol';
import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';

abstract contract DAOForkZeroState is NounsDAOLogicV3BaseTest {

    address tokenHolder = makeAddr("tokenHolder");
    address tokenHolder2 = makeAddr("tokenHolder2");
    uint256[] tokenIds;
    ForkDAODeployerMock forkDAODeployer;
    ERC20Mock erc20Mock = new ERC20Mock();
    address[] erc20Tokens = [address(erc20Mock)];

    function setUp() public virtual override {
        super.setUp();

        forkDAODeployer = new ForkDAODeployerMock();
        vm.startPrank(address(timelock));
        dao._setForkDAODeployer(address(forkDAODeployer));
        dao._setErc20TokensToIncludeInFork(erc20Tokens);
        vm.stopPrank();

        // Seed treasury with 1000 ETH and 300e18 of an erc20 token
        deal(address(timelock), 1000 ether);
        erc20Mock.mint(address(timelock), 300e18);

        // Mint total of 20 tokens. 18 to token holder, 2 to nounders
        vm.startPrank(minter);
        while (nounsToken.totalSupply() < 20) {
            nounsToken.mint();
            nounsToken.transferFrom(minter, tokenHolder, nounsToken.totalSupply() - 1);
        }
        vm.stopPrank();
        assertEq(dao.nouns().balanceOf(tokenHolder), 18);
    }

    function assertOwnerOfTokens(address token, uint256[] memory tokenIds_, address owner) internal {
        for (uint256 i = 0; i < tokenIds_.length; i++) {
            assertEq(IERC721(token).ownerOf(tokenIds_[i]), owner);
        }
    }
}

contract DAOForkZeroStateTest is DAOForkZeroState {
    function test_signalFork_transfersTokens() public {
        tokenIds = [1, 2, 3];

        vm.startPrank(tokenHolder);
        nounsToken.setApprovalForAll(address(dao), true);
        dao.signalFork(tokenIds);
        vm.stopPrank();

        assertEq(dao.nouns().balanceOf(tokenHolder), 15);
    }

    function test_executeFork_reverts() public {
        vm.expectRevert(NounsDAOV3Fork.ForkThresholdNotMet.selector);
        dao.executeFork();
    }

    function test_joinFork_reverts() public {
        tokenIds = [4, 5];
        vm.expectRevert(NounsDAOV3Fork.ForkPeriodNotActive.selector);
        vm.prank(tokenHolder);
        dao.joinFork(tokenIds);
    }
}

abstract contract DAOForkSignaledUnderThresholdState is DAOForkZeroState {
    function setUp() public virtual override {
        super.setUp();

        // signal fork with 3 tokens (15%)
        tokenIds = [1, 2, 3];

        vm.startPrank(tokenHolder);
        nounsToken.setApprovalForAll(address(dao), true);
        dao.signalFork(tokenIds);
        vm.stopPrank();
    }
}

contract DAOForkSignaledUnderThresholdStateTest is DAOForkSignaledUnderThresholdState {
    function test_executeFork_reverts() public {
        vm.expectRevert(NounsDAOV3Fork.ForkThresholdNotMet.selector);
        dao.executeFork();
    }

    function test_joinFork_reverts() public {
        tokenIds = [4, 5];
        vm.expectRevert(NounsDAOV3Fork.ForkPeriodNotActive.selector);
        vm.prank(tokenHolder);
        dao.joinFork(tokenIds);
    }

    function test_unsignalFork_returnsTokens() public {
        assertEq(dao.nouns().balanceOf(tokenHolder), 15);

        tokenIds = [1, 2, 3];

        vm.prank(tokenHolder);
        dao.unsignalFork(tokenIds);

        assertEq(dao.nouns().balanceOf(tokenHolder), 18);
    }

    function test_unsignalForkWithDifferentTokens_reverts() public {
        // move Noun #7 to tokenHolder2
        vm.prank(tokenHolder);
        nounsToken.transferFrom(tokenHolder, tokenHolder2, 7);
        assertEq(dao.nouns().ownerOf(7), tokenHolder2);

        // tokenHolder2 signals fork with Noun #7
        vm.startPrank(tokenHolder2);
        nounsToken.approve(address(dao), 7);
        tokenIds = [7];
        dao.signalFork(tokenIds);
        vm.stopPrank();

        tokenIds = [7];
        vm.expectRevert(NounsDAOForkEscrow.NotOwner.selector);
        vm.prank(tokenHolder);
        dao.unsignalFork(tokenIds);
    }

    function test_withdrawTokensToDAO_reverts() public {
        tokenIds = [1];
        vm.expectRevert(NounsDAOForkEscrow.NotOwner.selector);
        dao.withdrawForkTokensToDAO(tokenIds);
    }
}

abstract contract DAOForkSignaledOverThresholdState is DAOForkSignaledUnderThresholdState {
    function setUp() public virtual override {
        super.setUp();

        // signal fork with 5 tokens (25%)
        tokenIds = [4, 5];

        vm.startPrank(tokenHolder);
        nounsToken.setApprovalForAll(address(dao), true);
        dao.signalFork(tokenIds);
        vm.stopPrank();
    }
}

contract DAOForkSignaledOverThresholdStateTest is DAOForkSignaledOverThresholdState {
    function test_joinFork_reverts() public {
        tokenIds = [6, 7];
        vm.expectRevert(NounsDAOV3Fork.ForkPeriodNotActive.selector);
        vm.prank(tokenHolder);
        dao.joinFork(tokenIds);
    }

    function test_executeFork() public {
        dao.executeFork();

        // 25% of treasury should be sent to new DAO
        assertEq(address(timelock).balance, 750 ether);
        assertEq(address(forkDAODeployer.mockTreasury()).balance, 250 ether);

        // 25% of erc20 should be sent to new DAO
        assertEq(erc20Mock.balanceOf(address(timelock)), 225e18);
        assertEq(erc20Mock.balanceOf(address(forkDAODeployer.mockTreasury())), 75e18);
    }

    function test_unsignalForkUnderThreshold_blocksExecuteFork() public {
        tokenIds = [1, 2, 3];

        vm.prank(tokenHolder);
        dao.unsignalFork(tokenIds);

        vm.expectRevert(NounsDAOV3Fork.ForkThresholdNotMet.selector);
        dao.executeFork();
    }

    function test_withdrawTokensToDAO_reverts() public {
        tokenIds = [1];
        vm.expectRevert(NounsDAOForkEscrow.NotOwner.selector);
        dao.withdrawForkTokensToDAO(tokenIds);
    }

    function test_proposalThresholdIsLowered() public {
        vm.prank(address(timelock));
        dao._setProposalThresholdBPS(1000); // 10%

        // Before fork execute
        assertEq(dao.proposalThreshold(), 2);

        dao.executeFork();

        // there are 20 tokens, but 5 are now the DAO's, so adjusted total supply is 15
        assertEq(dao.adjustedTotalSupply(), 15);
        assertEq(dao.proposalThreshold(), 1); // 1.5 tokens

        // check that 2 tokens are enough for proposing
        address someone = makeAddr("someone");
        vm.prank(tokenHolder);
        nounsToken.transferFrom(tokenHolder, someone, 13);
        vm.prank(tokenHolder);
        nounsToken.transferFrom(tokenHolder, someone, 14);
        vm.roll(block.number + 1);
        propose(someone, address(0), 0, '', '', '');
    }
}

abstract contract DAOForkExecutedState is DAOForkSignaledOverThresholdState {
    function setUp() public virtual override {
        super.setUp();

        dao.executeFork();
    }
}

contract DAOForkExecutedStateTest is DAOForkExecutedState {
    function test_signalFork_reverts() public {
        tokenIds = [8, 9];
        
        vm.expectRevert(NounsDAOV3Fork.ForkPeriodActive.selector);
        vm.prank(tokenHolder);
        dao.signalFork(tokenIds);
    }

    function test_executeFork_reverts() public {
        vm.expectRevert(NounsDAOV3Fork.ForkPeriodActive.selector);
        dao.executeFork();
    }

    function test_unsignalFork_reverts() public {
        tokenIds = [4, 5];

        vm.expectRevert(NounsDAOV3Fork.ForkPeriodActive.selector);
        vm.prank(tokenHolder);
        dao.unsignalFork(tokenIds);
    }

    function test_joinFork() public {
        tokenIds = [8, 9];

        vm.prank(tokenHolder);
        dao.joinFork(tokenIds);

        // now 35% of the treasury is in the new DAO
        assertEq(address(timelock).balance, 650 ether);
        assertEq(address(forkDAODeployer.mockTreasury()).balance, 350 ether);

        assertEq(erc20Mock.balanceOf(address(timelock)), 195e18);
        assertEq(erc20Mock.balanceOf(address(forkDAODeployer.mockTreasury())), 105e18);

        // 1 more token joins
        tokenIds = [7];
        vm.prank(tokenHolder);
        dao.joinFork(tokenIds);

        // now 40% of the treasury is in the new DAO
        assertEq(address(timelock).balance, 600 ether);
        assertEq(address(forkDAODeployer.mockTreasury()).balance, 400 ether);

        assertEq(erc20Mock.balanceOf(address(timelock)), 180e18);
        assertEq(erc20Mock.balanceOf(address(forkDAODeployer.mockTreasury())), 120e18);
    }

    function test_withdrawTokensToDAO() public {
        tokenIds = [1, 2, 3];
        dao.withdrawForkTokensToDAO(tokenIds);

        assertEq(dao.nouns().ownerOf(1), address(dao.timelock()));
        assertEq(dao.nouns().ownerOf(2), address(dao.timelock()));
        assertEq(dao.nouns().ownerOf(3), address(dao.timelock()));
    }
}

abstract contract DAOForkExecutedActivePeriodOverState is DAOForkExecutedState {
    function setUp() public virtual override {
        super.setUp();

        skip(NounsDAOV3Fork.FORK_PERIOD_DURTION);
    }
}

contract DAOForkExecutedActivePeriodOverStateTest is DAOForkExecutedActivePeriodOverState {
    function test_joinFork_reverts() public {
        tokenIds = [8, 9];

        vm.prank(tokenHolder);
        vm.expectRevert(NounsDAOV3Fork.ForkPeriodNotActive.selector);
        dao.joinFork(tokenIds);
    }

    function test_execute_reverts() public {
        vm.expectRevert(NounsDAOV3Fork.ForkThresholdNotMet.selector);
        dao.executeFork();
    }

    function test_withdrawTokensToDAO() public {
        tokenIds = [1, 2, 3];
        dao.withdrawForkTokensToDAO(tokenIds);

        assertOwnerOfTokens(address(dao.nouns()), tokenIds, address(dao.timelock()));
    }

    function test_signalOnNewFork() public {
        tokenIds = [11, 12];
        vm.prank(tokenHolder);
        dao.signalFork(tokenIds);

        assertOwnerOfTokens(address(dao.nouns()), tokenIds, address(forkEscrow));
    }
}

abstract contract DAOSecondForkSignaledUnderThreshold is DAOForkExecutedActivePeriodOverState {
    function setUp() public virtual override {
        super.setUp();

        tokenIds = [11, 12];
        vm.prank(tokenHolder);
        dao.signalFork(tokenIds);
    }
}

contract DAOSecondForkSignaledUnderThresholdTest is DAOSecondForkSignaledUnderThreshold {
    function test_executeFork_reverts() public {
        vm.expectRevert(NounsDAOV3Fork.ForkThresholdNotMet.selector);
        dao.executeFork();
    }

    function test_joinFork_reverts() public {
        tokenIds = [14, 15];
        vm.expectRevert(NounsDAOV3Fork.ForkPeriodNotActive.selector);
        vm.prank(tokenHolder);
        dao.joinFork(tokenIds);
    }

    function test_unsignalFork_returnsTokens() public {
        tokenIds = [11, 12];
        assertOwnerOfTokens(address(dao.nouns()), tokenIds, address(forkEscrow));

        vm.prank(tokenHolder);
        dao.unsignalFork(tokenIds);

        assertOwnerOfTokens(address(dao.nouns()), tokenIds, tokenHolder);
    }

    function test_withdrawTokensToDAO_reverts() public {
        tokenIds = [11];
        vm.expectRevert(NounsDAOForkEscrow.NotOwner.selector);
        dao.withdrawForkTokensToDAO(tokenIds);
    }
}

abstract contract DAOSecondForkSignaledOverThreshold is DAOSecondForkSignaledUnderThreshold {
    function setUp() public virtual override {
        super.setUp();

        // adjusted total supply is 15, so for 20% 3 tokens are enough (15 * 0.2 = 3)
        tokenIds = [13];
        vm.prank(tokenHolder);
        dao.signalFork(tokenIds);
    }
}

contract DAOSecondForkSignaledOverThresholdTest is DAOSecondForkSignaledOverThreshold {
    function test_executeFork() public {
        assertEq(address(timelock).balance, 750 ether);
        assertEq(dao.adjustedTotalSupply(), 15);

        dao.executeFork();

        assertEq(address(timelock).balance, 600 ether);
        assertEq(address(forkDAODeployer.mockTreasury()).balance, 400 ether);
        
        assertEq(erc20Mock.balanceOf(address(timelock)), 180e18);
        assertEq(erc20Mock.balanceOf(address(forkDAODeployer.mockTreasury())), 120e18);

        tokenIds = [11, 12, 13];
        dao.withdrawForkTokensToDAO(tokenIds);

        assertOwnerOfTokens(address(dao.nouns()), tokenIds, address(dao.timelock()));
    }
}