var MyMinter = artifacts.require("./MyMinter.sol");

module.exports = function(deployer) {
  deployer.deploy(MyMinter);
};
