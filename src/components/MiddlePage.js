import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import {
  loadUserAccounts,
  loadContractAccount,
  loadUserAccountsBalances,
  loadContractAccountBalance
} from '../actions';
import web3 from '../ethereum/web3';
import todolist from '../ethereum/todolist';
import { customStyle, customStyle2 } from './utils/style';

class MiddlePage extends React.Component {
  state = {
    randomBytes: '',
    randomTask: ''
  };

  async componentDidMount() {
    this.props.loadUserAccounts();
    this.props.loadUserAccountsBalances();
    this.props.loadContractAccount();
    this.props.loadContractAccountBalance();
    try {
      const randomBytes = await todolist.methods.randomBytes().call();
      const randomTask = await todolist.methods.getRandomTask().call();
      this.setState({ randomBytes, randomTask });
    } catch (error) {
      this.setState({ randomBytes: ' ', randomTask: ' ' });
    }
  }

  renderPage() {
    const { contractAccount, contractAccountBalance, userAccounts, userAccountsBalances } = this.props;
    const { randomBytes, randomTask } = this.state;
    const cardItems = [
      {
        'text': 'TodoList User Account',
        'text2': 'Address',
        'text3': 'Balance (Wei)',
        'address': userAccounts[0],
        'balance': userAccountsBalances[0],
        'key': 1
      },
      {
        'text': 'TodoList Smart Contract',
        'text2': 'Address',
        'text3': 'Balance (Wei)',
        'address': contractAccount,
        'balance': contractAccountBalance,
        'key': 2
      },
      {
        'text': 'TodoList Smart Contract Random Hex Generator',
        'text2': 'Smart Contract Random Hex',
        'text3': 'Hex',
        'address': 'Smart Contract Methods',
        'balance': web3.utils.bytesToHex(randomBytes),
        'key': 3
      },
      {
        'text': 'TodoList Random Task',
        'text2': 'Content',
        'text3': 'Completed',
        'address': randomTask[1] ? randomTask[1] : 'Empty',
        'balance': randomTask[2] ? 'True' : 'False',
        'key': 4
      }
    ];

    return _.map(cardItems, ({ text, text2, text3, address, balance, key }) => {
      return (
        <div key={ key } className="card darken-1" style={ customStyle2 }>
          <div className="card-content">
            <span className="card-title">{ text }</span>
          </div>
          <div className="card-action">
            <a href="/">{ text2 }: { address }</a>
            <br />
            <a href="/">{ text3 }: { balance }</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={ customStyle }>
        <h1>
          Decentralized App powered by Ethereum Blockchain!
        </h1>
        <h4>
          Add items to your todo list!
        </h4>
        { this.renderPage() }
      </div>
    );
  };
}

const mapStateToProps = ({ userAccounts, userAccountsBalances, contractAccount, contractAccountBalance }) => {
  return {
    userAccounts,
    userAccountsBalances,
    contractAccount,
    contractAccountBalance
  };
};

export default connect(mapStateToProps,
  {
    loadUserAccounts,
    loadUserAccountsBalances,
    loadContractAccount,
    loadContractAccountBalance
  }
)(MiddlePage);
