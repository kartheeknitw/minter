//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    constructor(address owner, string memory _tokenName, string memory _tokenSymbol, uint _initialSupply) ERC20(_tokenName, _tokenSymbol) {
        _mint(owner, _initialSupply);
    }
}
