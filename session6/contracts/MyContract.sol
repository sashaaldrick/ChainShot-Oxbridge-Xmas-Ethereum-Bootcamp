//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MyContract {
    // address: EOA or smart contract
    constructor(address _secondContract) {
        SecondContract(_secondContract).changeX(55);
    }
}

contract SecondContract {
    uint public x; // 0x0   
    function changeX(uint _x) external {
        x = _x;
    }
}