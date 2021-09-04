import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
class App extends React.Component {
  // equal to constructor(props)
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
    //console.log("123"+manager);
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting for the transaction finished ... ' });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You have been entered!' });
  };

  onClick= async(event) =>{
    const accounts= await web3.eth.getAccounts();
    this.setState({message:'Waiting for the process picking winner ....'})
    await lottery.methods.pickWinner().send({
      from: accounts[0]
      
    });
    this.setState({message:'A winner has been picked!'});
  };
  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
          <hr />There are currently {this.state.players.length} people enter the competition to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h3> Want to try your luck?</h3>
          <div>
            <label>Amount of ether to enter   </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })} />
          </div>
          <button>Submit</button>
        </form>
        <hr />
        <h3>Ready to find out the winner?</h3>
        <button onClick={this.onClick}>Pick the winner</button>
        <hr />
        <h1>{this.state.message}</h1>
        <hr />

      </div>
    );
  }
}
export default App;