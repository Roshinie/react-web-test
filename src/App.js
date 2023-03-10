import React, { Component } from 'react';
import { ethers } from "ethers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: null,
      signer: null,
      provider: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async init() {
    if (window.ethereum) {
      console.log("Wallet identified")
      // if window.ethereum is defined
      await window.ethereum.enable(); // Enable the Ethereum client
      this.provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
      this.signer = this.provider.getSigner(); // Holds your private key and can sign things
      console.log(this.provider)
      console.log(this.signer)
      this.setState({ currentAddress: await this.signer.getAddress() }); // Set the current address
      this.setState({ signer: this.signer }); 
      this.setState({ provider: this.provider }); 
    } else {
      alert("No wallet detected"); // No wallet detected
    }
  }

  componentDidMount() {
    this.init();
  }

  handleSubmit(e) {
    console.log("Send request")
    console.log(this.state.currentAddress)
    console.log(this.state.signer)
    console.log(typeof(this.state.signer))
    const sig = this.state.signer;
      fetch('http://localhost:8080/mint-nft', {
         method: 'POST',
         body: JSON.stringify({
            signer: sig
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((res) => res.json())
         .catch((err) => {
            console.log(err.message);
         });
  }

render() {
    return (
      <div>
        <div class="jumbotron d-flex align-items-center">
          <div class="container">
            <h1>Account Details</h1>
            <p>{this.state.currentAddress}</p>
            <h1>Mint a Token</h1>
            <button type="submit" onClick={this.handleSubmit}>Mint</button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;