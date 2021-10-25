import Web3 from "web3";

let web3;
if(typeof web3 !=='undefined'){ //检查是否已有web3实例
    web3=new Web3(web3.currentProvider);
}else{
    web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


let abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "corpAddr",
				"type": "address"
			}
		],
		"name": "queryCorp",
		"outputs": [
			{
				"components": [
					{
						"name": "CorpName",
						"type": "string"
					},
					{
						"name": "CorpInfo",
						"type": "string"
					},
					{
						"name": "JoinTime",
						"type": "uint256"
					},
					{
						"name": "Registered",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "corpAddr",
				"type": "address"
			}
		],
		"name": "queryQuota",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newCorpAddr",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "info",
				"type": "string"
			}
		],
		"name": "initCorp",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "corpAddr",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "int256"
			},
			{
				"name": "depositeOrWithdraw",
				"type": "bool"
			}
		],
		"name": "updateQuota",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "toAddr",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "int256"
			}
		],
		"name": "fromExchangeTransfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "int256"
			}
		],
		"name": "toExchangeTransfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

var address = "0xe854aad1ff720bf6554e9737eb1cd7e8db957839" ;
const contract = new web3.eth.Contract(abi,address)
const meta = contract

web3.eth.getBlock(0, function(error, result){
	if(!error)
		console.log("connection should be succeed");
	else
		console.log("something wrong,the connection might be failed");
})

let message={
    "123":"0x9e7f37ddaeccd51326e088c0aa17a9164150ef34",
    "1234":"0xc661d4bc74da6deb4e50ee635896c03e7a50484d",
    "1":"0xcf9ea99caba02d20c409a3d56be54d05bd1dc48b"
}

export const toExchangeTransfer_ =  async(username,password,amount)=>{
    // account 这个时候就是要由前端传入账号。
    // await web3.eth.personal.unlockAccount(message[username], password)
	const {toExchangeTransfer} = meta.methods
	console.log("11111")
    let result = await toExchangeTransfer(amount).send({ from: message[username], gas: 3000000})
	// result表示转移到交易所的情况。
	console.log("end")
    return result
}


export const queryQuota_ = async(username,password) =>{
	// console.log(message[username])
	// console.log("222")
	// const {queryQuota} = meta.methods
	// let quota = await queryQuota("0x9e7f37ddaeccd51326e088c0aa17a9164150ef34").call()
	// return quota
	console.log("query!!!!!")
	console.log(message[username])
	// await web3.eth.personal.unlockAccount(message[username], password)
	console.log("解锁成功！")
	const {queryQuota} = meta.methods
	let quota = await queryQuota(message[username]).call()
	console.log("查询成功！")
	return quota
}

