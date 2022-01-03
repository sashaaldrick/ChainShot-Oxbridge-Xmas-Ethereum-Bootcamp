const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("MyContract", function () {
  // beforeEach(async () => {
  //   const MyContract = await ethers.getContractFactory("MyContract"); // reads artifacts and hooks ethers up with the ABI
  // });
  it("should allow us to change the value x", async function () {
    // getContractFactory looks up ABI and the bytecode of MyContract from the artifacts folder.
    const MyContract = await ethers.getContractFactory("MyContract"); // reads artifacts and hooks ethers up with the ABI
    // getContractFactory does this: 
    // const signer = await ethers.provider.getSigner(0);
    // look up ABI and ByteCode with ethers.ContractFactory
    // where is the signing and gas? it does it all for you
    const contract = await MyContract.deploy(); // this has all the data already, like x
    await contract.deployed();

    const x = await contract.x();
    assert.equal(x, 0); // doesn't have to be hex as it does it all for you

    await contract.changeX(22);
    const newX = await contract.x();

    assert.equal(newX, 22);


  });
});
