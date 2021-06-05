 // const BigNumber = web3.BigNumber;
const chai = require('chai');
var should = require('chai').should();
const BN = require('bn.js');


const DappToken = artifacts.require("DappToken");
const DappTokenCrowdsale = artifacts.require("DappTokenCrowdsale.sol");

// Enable and inject BN dependency
chai.use(require('chai-bn')(BN));

contract('Dapptoken Crowdsale', ([_,wallet])=> {

	beforeEach(async () => {
		this.token = await DappToken.new('Dapp Token', 'DTC', 18);
	
		//Crowdsale config
		this.rate = 500;
		this.wallet = wallet;	
	
		this.crowdsale = await DappTokenCrowdsale.new(this.rate, this.wallet, this.token.address);
	});

	describe('Crowdsale', () =>{
		it('Tracks the rate', async () => {
			const rate = await this.crowdsale.rate();
			rate.should.be.a.bignumber.that.equals('500');
		});
		it('Tracks the wallet', async () => {
			const wallet = await this.crowdsale.wallet();
			wallet.should.equal((this.wallet).toString());
		})
		it('Tracks the token', async () => {
			const token = await this.crowdsale.token();
			token.should.equal(this.token.address);
		});
	});
});