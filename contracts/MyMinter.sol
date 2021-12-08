//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./CustomToken.sol";

contract MyMinter {
    event TokenCreated(address indexed  _minter, address indexed _contract, uint _initialSupply);

    function mintToken(string memory _tokenName, string memory _tokenSymbol, uint _initialSupply) public returns(address) {
        CustomToken _tk = new CustomToken(msg.sender, _tokenName, _tokenSymbol, _initialSupply);
        emit TokenCreated(msg.sender, address(_tk), _initialSupply);
        return address(_tk);
    }
}