import React, { Component } from "react";
import MyMinterContract from "./contracts/MyMinter.json";
import Web3 from "web3";

import "./App.css";
import Stepper from "./components/Stepper";
import BasicForm from "./components/Forms/BasicForm";
import Tokenomics from './components/Forms/Tokenomics'
import { Button, Col, Row } from "antd";
import FinalForm from "./components/Forms/FinalForm";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, displayState: null };
  constructor(props) {
    super(props)
    this.state = {
      basic: {
        
      },
      token: {},
      step: 0,
    }
  }

  componentDidMount = async () => {
    const web3 = new Web3(window.ethereum);
    this.setState({ web3, level: 0 });
    this.accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (this.accounts.length === 0) {
      console.log("Metamask is Disconnected");
    } else {
      console.log("Metamask is Connected");
      await this.handleConnectWallet();
    }
  };

  handleConnectWallet = async (e) => {
    if (window.ethereum) {
      try {
        const web3 = this.state.web3;
        const ethereum = window.ethereum;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MyMinterContract.networks[networkId];
        const contract = new web3.eth.Contract(
          MyMinterContract.abi,
          deployedNetwork && deployedNetwork.address
        );        
        const displayAccount = account.slice(0,4) + "..." + account.slice(-4);
        this.setState({ accounts, contract, displayAccount });
        console.log("Loaded web3 and account: " + account + " displayAccount: " + displayAccount);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    } else {
      console.log("No web3 connection");
    }
  };

  createToken = async () => {
    // Create custom token.
    console.log(this.state);    
    var result = await this.state.contract.methods.mintToken(this.state.basic.tokenName, this.state.basic.tokenSymbol, this.state.token.initialSupply).send({from: this.state.accounts[0]});
    console.log(result.events.TokenCreated.returnValues._contract);
  }

  nextStep = () => {
    this.setState({
      ...this.state,
      step: this.state.step + 1
    })
  }

  setBasicFormData = (data) => {
    this.setState({
      ...this.state,
      basic: data
    })
  }

  setTokenFormData = (data) => {
    this.setState({
      ...this.state,
      token: data
    })
  }

  render() {
    console.log('this',this.state)
    return (
      <Row style={{paddingTop : 24}} gutter={[0, 48]}>
        <Col offset={20} span={4}>
            <Button disabled={!!this.state.accounts} onClick={this.handleConnectWallet} type="primary" className="connect_btn">
            {this.state.displayAccount ? this.state.displayAccount : 'Connect Wallet'} 
          </Button>
        </Col>
        <Col span={12} offset={6}>
          <Stepper step={this.state.step} />
        </Col>
        <Col span={12} offset={6}>
          {
            this.state.step === 0 && <BasicForm nextStep={this.nextStep} setBasicFormData={this.setBasicFormData} />
          }
          {
            this.state.step === 1 && <Tokenomics nextStep={this.nextStep} setTokenFormData={this.setTokenFormData} />
          }
          {
            this.state.step === 2 && <FinalForm state={this.state} createToken={this.createToken}/>
          }
        </Col>
      </Row>
    );
  }
}

export default App;


