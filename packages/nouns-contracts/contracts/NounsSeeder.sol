// SPDX-License-Identifier: GPL-3.0

/// @title The NounsToken pseudo-random seed generator

/*********************************
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░██░░░████░░██░░░████░░░ *
 * ░░██████░░░████████░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░██░░██░░░████░░██░░░████░░░ *
 * ░░░░░░█████████░░█████████░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ *
 *********************************/

pragma solidity ^0.8.6;

import { INounsSeeder } from './interfaces/INounsSeeder.sol';
import { INounsDescriptorMinimal } from './interfaces/INounsDescriptorMinimal.sol';
import "hardhat/console.sol";
contract NounsSeeder is INounsSeeder {
    /**
     * @notice Generate a pseudo-random Noun seed using the previous blockhash and noun ID.
     */
    // prettier-ignore
    function generateSeed(uint256 nounId, INounsDescriptorMinimal descriptor) external view override returns (Seed memory) {
        uint256 pseudorandomness = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), nounId))
        );

        uint256 backgroundCount = descriptor.backgroundCount();
        uint256 backDecorationCount = descriptor.backDecorationCount();
        uint256 backgroundDecorationCount = descriptor.backgroundDecorationCount();
        uint256 specialCount = descriptor.specialCount();
        console.log("specialCount", specialCount);
        uint256 leftHandCount = descriptor.leftHandCount();
        console.log("leftHandCount", leftHandCount);
        uint256 backCount = descriptor.backCount();
        uint256 clotheCount = descriptor.clotheCount();
        uint256 chokerCount = descriptor.chokerCount();
        uint256 earCount = descriptor.earCount();
        uint256 hairCount = descriptor.hairCount();
        uint256 hatCount = descriptor.hatCount();
        uint256 headphoneCount = descriptor.headphoneCount();

        console.log("uint48(uint48(pseudorandomness >> 144) % specialCount)", uint48(uint48(pseudorandomness >> 144) % specialCount));

        return Seed({
            background: uint48(
                uint48(pseudorandomness) % backgroundCount
            ),
            backDecoration: uint48(
                uint48(pseudorandomness >> 48) % backDecorationCount
            ),
            backgroundDecoration: uint48(
                uint48(pseudorandomness >> 96) % backgroundDecorationCount
            ),
            special: uint48(
                uint48(pseudorandomness >> 144) % specialCount
            ),
            leftHand: uint48(
                uint48(pseudorandomness >> 192) % leftHandCount
            ),
            back: uint48(
                uint48(pseudorandomness >> 240) % backCount
            ),
            clothe: uint48(
                uint48(pseudorandomness >> 288) % clotheCount
            ),
            choker: uint48(
                uint48(pseudorandomness >> 336) % chokerCount
            ),
            ear: uint48(
                uint48(pseudorandomness >> 384) % earCount
            ),
            hair: uint48(
                uint48(pseudorandomness >> 432) % hairCount
            ),
            hat: uint48(
                uint48(pseudorandomness >> 480) % hatCount
            ),
            headphone: uint48(
                uint48(pseudorandomness >> 528) % headphoneCount
            )
        });
    }
}
