//编译智能合约的脚本
const path = require('path');
const fs = require(('fs'));
//依赖
const solc = require('solc');

const srcpath = path.resolve(__dirname, 'contracts','Inbox.sol');
const source = fs.readFileSync(srcpath,'utf-8');

const result = solc.compile(source, 1);

module.exports = result.contracts[':Inbox'];

