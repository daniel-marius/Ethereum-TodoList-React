const IPFS = require('ipfs-http-client');

const config = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
};

const ipfs = IPFS({
  host: config.host,
  port: config.port,
  protocol: config.protocol
});

export default ipfs;
