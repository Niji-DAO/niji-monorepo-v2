// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

import { NounsToken } from '../NounsToken.sol';
import { INounsDescriptorMinimal } from '../interfaces/INounsDescriptorMinimal.sol';
import { INounsSeeder } from '../interfaces/INounsSeeder.sol';
import { IProxyRegistry } from '../external/opensea/IProxyRegistry.sol';

contract NounsTokenHarness is NounsToken {
    uint256 public currentNounId;

    constructor(
        address noundersDAO,
        address minter,
        INounsDescriptorMinimal descriptor,
        INounsSeeder seeder,
        IProxyRegistry proxyRegistry
    ) NounsToken(noundersDAO, minter, descriptor, seeder, proxyRegistry) {}

    function mintTo(address to) public {
        _mintTo(to, currentNounId++);
    }

    function mintMany(address to, uint256 amount) public {
        for (uint256 i = 0; i < amount; i++) {
            mintTo(to);
        }
    }

    function mintSeed(
        address to,
        uint48 background,
        uint48 backDecoration,
        uint48 backgroundDecoration,
        uint48 special,
        uint48 back,
        uint48 clothe,
        uint48 choker,
        uint48 ear,
        uint48 hair,
        uint48 hat,
        uint48 headphone,
        uint48 leftHand
    ) public {
        seeds[currentNounId] = INounsSeeder.Seed({
            background: background,
            backDecoration: backDecoration,
            backgroundDecoration: backgroundDecoration,
            special: special,
            back: back,
            clothe: clothe,
            choker: choker,
            ear: ear,
            hair: hair,
            hat: hat,
            headphone: headphone,
            leftHand: leftHand
        });

        _mint(owner(), to, currentNounId++);
    }
}
