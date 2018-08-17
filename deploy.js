//引入web3
const Web3 = require('web3');
const {interface,bytecode} =require("./compile");
//引入钱包
const HDWalletProvider = require('truffle-hdwallet-provider');
//助记词
const mnemonic = "eyebrow cabin chunk safe hat mansion waste slender upgrade lady lobster visa"; // 12 word mnemonic
// Or, alternatively pass in a zero-based address index.
//借助infura.io部署到web3
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/3e8ec41d60ef4459b151eee9701370ba");
//插入电话卡
const web3 = new Web3(provider);


deploy = async () => {
	//0x26E6d048a864267F71CD0d732418da1bcA8f5058
	const accounts =await web3.eth.getAccounts();
	console.log(accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(interface))
	//上面的只是个对象,需要deploy方法部署到区块链上
		.deploy(
			{
				//部署的真是数据是二进制的bytecode
				data:bytecode,
				//部署的时候附上构造函数的参数
				arguments: ["abc"]
			}
			//部署是一个转账的操作
		).send(
			{
				from: accounts[0],
				//需要花费汽油
				gas: '5000000'
			}
		);
	console.log("address:" + result.options.address);
};
deploy();
