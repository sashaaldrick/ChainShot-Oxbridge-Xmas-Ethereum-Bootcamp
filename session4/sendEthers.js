const ethers = require('ethers');
require('dotenv').config();

async function main() {

  // Alchemy/Infura HTTP endpoint URL
  const url = process.env.RINKEBY_URL; 

  // hook up ethers provider
  const provider = new ethers.providers.JsonRpcProvider(url);

  // copy-paste a private key from a Rinkeby account!
  const privateKey = process.env.RINKEBY_PRIVATE_KEY; 

  // let's create a Wallet instance so that our sender can... send!
  const wallet = new ethers.Wallet(privateKey, provider);

  const toAddr = "0x95B6F43BCF5bfC9c406677AA9887A55d7C91FAC7"; // copy-paste someone from your group!
  const walletBalance = await wallet.getBalance();

  console.log(
    "Balance of sender address before tx: " + ethers.utils.formatEther(walletBalance)
  );

  console.log(
    "Sending ether from " + wallet.address + " to " + toAddr
  );
  
  const tx = await wallet.sendTransaction({
    to: toAddr,
    value: ethers.utils.parseEther('.01'),
  });

  // waits for the tx to be mined so that any subsequent queries are accurate
  await tx.wait();
  console.log("Tx hash: " + tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});