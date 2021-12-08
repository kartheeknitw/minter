import React, { Component } from "react";
import MyMinterContract from "./contracts/MyMinter.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = MyMinterContract.networks[networkId];
      this.contract = new this.web3.eth.Contract(
        MyMinterContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Create custom token.
      // var result = await this.contract.methods.mintToken("Shibu Coin", "SHIB", "1000000000000000000000000000").send({from: this.accounts[0]});
      // console.log(result.events.TokenCreated.returnValues._contract);
      console.log("Loaded web3!!");
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: </div>
      </div>
    );
  }
}

export default App;
