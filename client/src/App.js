import React, { Component } from "react";
import MyMinterContract from "./contracts/MyMinter.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Stepper from "./components/Stepper";
import BasicForm from "./components/Forms/BasicForm";
import Tokenomics from './components/Forms/Tokenomics'
import { Button, Col, Row } from "antd";
import FinalForm from "./components/Forms/FinalForm";

class App extends Component {
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
      console.log("Loaded web3!!");
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleConnectWallet = async (e) => {
   
  };

  createToken = async () => {
    // Create custom token.
    var result = await this.contract.methods.mintToken("Shibu Coin", "SHIB", "1000000000000000000000000000").send({from: this.accounts[0]});
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
            <Button onClick={this.handleConnectWallet} type="primary">
              Create Account
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


