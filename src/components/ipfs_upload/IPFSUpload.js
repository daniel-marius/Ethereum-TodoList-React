import React from 'react';
import { connect } from 'react-redux';

import todolist from '../../ethereum/todolist';
import { ipfsFileUpload } from '../../actions';

class IPFSUpload extends React.Component {
  state = {
    file: null,
    fileHash: ''
  };

  async componentDidMount() {
    try {
      const fileHash = await todolist.methods.getHash().call();
      this.setState({ fileHash });
    } catch (error) {
      this.setState({ fileHash: '' });
    }
  }

  renderImage() {
    const { fileHash } = this.state;
    if (fileHash) {
      return (
        <img
          alt={ fileHash }
          src={ `https://ipfs.infura.io/ipfs/${fileHash}` }
          style={{ marginTop: '40px' }}
        />
      );
    } else {
      return (
        <div>
          No Image Uploaded...
        </div>
      );
    }
  }

  onFileChange = (event) => {
    event.preventDefault();
    // Process file for IPFS
    // Convert picture to binary data
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ file: Buffer.from(reader.result) });
    };
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.ipfsFileUpload(this.state.file);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ marginTop: '40px' }}>
          <h4>Upload an Image with IPFS</h4>
          <input
            onChange={this.onFileChange}
            type="file"
          />
          <button className="btn waves-effect-waves-light" type="submit">submit
            <i className="material-icons right">send</i>
          </button>
        </form>
        <br />
          { this.renderImage() }
      </div>
    );
  };
}

const mapStateToProps = ({ ipfsFileHash }) => {
  return { ipfsFileHash };
};

export default connect(mapStateToProps, { ipfsFileUpload })(IPFSUpload);
