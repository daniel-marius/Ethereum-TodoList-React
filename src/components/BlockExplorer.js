import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { loadGasPrice, loadLatestBlock, loadLatestBlocks } from '../actions';
import web3 from '../ethereum/web3';
import Spinner from './utils/Spinner';
import { customStyle, customStyle2 } from './utils/style';

class BlockExplorer extends React.Component {
  componentDidMount() {
    this.props.loadGasPrice();
    this.props.loadLatestBlock();
    this.props.loadLatestBlocks();
  }

  renderCards() {
    const { latestBlock, gasPrice } = this.props;
    if (latestBlock && gasPrice) {
      const renderItems = [
        { 'text': 'Latest Block Number',
          'value': latestBlock.number,
          'key': 1
        },
        { 'text': 'Current Block Difficulty',
          'value': latestBlock.difficulty,
          'key': 2
        },
        { 'text':
          'Current Gas Price (ETH)',
          'value': web3.utils.fromWei(gasPrice.toString(), 'ether'),
          'key': 3
        }
      ];

      return _.map(renderItems, ({ text, value, key }) => {
        return (
          <div key={ key } className="card blue-grey darken-1" style={ customStyle2 }>
            <div className="card-content white-text">
              <span className="card-title">{ text }</span>
            </div>
            <div className="card-action">
              <a href="/blockexplorer">{ value }</a>
            </div>
          </div>
        );
      });
    } else {
      return (
        <Spinner />
      );
    }
  }

  renderTable() {
    const { latestBlocks } = this.props;
    if (latestBlocks) {
      return latestBlocks.map(({ number, parentHash, hash, timestamp }) => {
        return (
          <tr key={ number }>
            <td>{ number }</td>
            <td>{ parentHash }</td>
            <td>{ hash }</td>
            <td>{ timestamp }</td>
          </tr>
        );
      });
    } else {
      return (
        <Spinner />
      );
    }
  }

  render() {
    return (
      <div style={ customStyle }>
        <h1>
          Ethereum Block Explorer!
        </h1>
        { this.renderCards() }

        <table className="responsive-table highlight striped centered" style={{ marginTop: '50px' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>ParentHash</th>
              <th>Hash</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTable() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ gasPrice, latestBlock, latestBlocks }) => {
  return { gasPrice, latestBlock, latestBlocks };
};

export default connect(mapStateToProps,
  {
    loadGasPrice,
    loadLatestBlock,
    loadLatestBlocks
  }
)(BlockExplorer);
