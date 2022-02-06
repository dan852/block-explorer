import { utils, providers } from 'ethers';

class EthersAPI {

    constructor() {
        console.log(process.env.ALCHEMY_API);
        this.provider = new providers.AlchemyProvider("rinkeby");

    }
    async getBlock(blockNumber) {
        return await this.provider.getBlock(blockNumber);
    }
    async getLatestBlock() {
        let latestBlockNumber = await this.provider.getBlockNumber();
        return await this.getBlock(latestBlockNumber);
    }
    async getLatestBlocks(numberOfBlocks) {
        let blocks = [];
        let block = null;
        let latestBlockNumber = await this.provider.getBlockNumber();
        for (let i = latestBlockNumber; i > (latestBlockNumber - numberOfBlocks); i--) {
            let block = await this.provider.getBlockWithTransactions(i);
            blocks.push(block);
        }
        return blocks;
    }
    async getTransaction(transactionHash) {
        const transaction = await this.provider.getTransaction(transactionHash);
        return transaction;
    }
}

export { EthersAPI };