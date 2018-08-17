//引入断言库
const assert = require("assert");
//引入测试环境
const ganache = require("ganache-cli");
//测试部署智能合约
const {interface,bytecode} =require("../compile");
//约定规范，大写的是构造函数
const Web3 = require("web3");
//把ganache测试网络插入到web3中
const web3 = new Web3(ganache.provider());

describe("测试智能合约", () => {
    it("测试web3的版本", () => {
        console.log(web3.version);
    });
    it("测试web3的网络provider", () => {
        console.log(web3.eth.currentProvider);
    });
    // it('get account',  ()=> {
    //     web3.eth.getAccounts().then((accounts)=>{
    //         console.log(accounts);
    //     })
    // });
    it('should getAccounts',async()=>{
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const Balance = await web3.eth.getBalance(accounts[0]);
        console.log(Balance);
        console.log(web3.utils.fromWei(Balance, 'ether'));
    });
    //测试部署智能合约
    it('should 智能合约',async()=> {
        //拿到智能合约账户
        const account = await web3.eth.getAccounts();
        //Contract构造函数，需要new出来一个，里面填上abi，json的interface
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
                from: account[0],
                //需要花费汽油
                gas: 1000000
            }
        );
        console.log("address:" + result.options.address);
        //部署成功，调用合约内方法
	    let message = await result.methods.getMessage().call();
	    console.log(message);
	    //断言
	    assert.equal(message, 'abc');
	
	    await result.methods.setMessage('HAHAHAHA').send({
		    from: account[0],
		    gas: 1000000
	    });
	
	     message = await result.methods.getMessage().call();
	    console.log(message);
	    assert.equal(message,'HAHAHAHA')
	
    });
});