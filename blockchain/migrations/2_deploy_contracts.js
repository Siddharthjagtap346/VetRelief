const VetRelief = artifacts.require("VetRelief");

module.exports = async function (deployer, network, accounts) {
  console.log("Deploying from account:", accounts[0]);
  await deployer.deploy(VetRelief, { from: accounts[0] });
};
