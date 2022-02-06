
import { Modal } from 'bootstrap';
import moment from 'moment';
import { utils } from 'ethers';
import { EthersAPI } from './api';


class ViewController {
    constructor() {
        this.ethersAPI = new EthersAPI();
    }

    routeHome() {
        this.loadBlocks();
    }
    routeTransaction(transactionHash) {
        this.loadTransaction(transactionHash);
    }
    loadBlocks() {
        document.getElementById('blk-timer').innerText = "Refreshing..."
        document.getElementById('trx-timer').innerText = "Refreshing..."
        let blocks = this.ethersAPI.getLatestBlocks(10);

        blocks.then((blocks) => {
            this._updateTables(blocks);
            document.getElementById('blk-timer').innerHTML = "&nbsp;";
            document.getElementById('trx-timer').innerHTML = "&nbsp;";
        });
    }
    loadTransaction(transactionHash) {
        var trxModal = new Modal(document.getElementById("modal-trx"), {});
 
        const transaction = this.ethersAPI.getTransaction(transactionHash);
        transaction.then((transaction) => {
    
            document.getElementById('modal-trx-title').innerText = `Transaction ${ this._truncate(transaction.hash) }`;
    
            document.getElementById('inputHash').setAttribute('value', transaction.hash);
            document.getElementById('inputFrom').setAttribute('value', transaction.from);
            document.getElementById('inputTo').setAttribute('value', transaction.to);
            document.getElementById('inputValue').setAttribute('value', parseFloat(utils.formatEther(transaction.value)).toFixed(3) + " ETH");
            document.getElementById('inputGasPrice').setAttribute('value', utils.formatUnits(transaction.gasPrice, "gwei"));
            document.getElementById('inputConfirmations').setAttribute('value', transaction.confirmations);
            document.getElementById('inputNonce').setAttribute('value', transaction.nonce);
            document.getElementById('inputBlockHash').setAttribute('value', transaction.blockHash);
            document.getElementById('inputBlockNumber').setAttribute('value', transaction.blockNumber);
            trxModal.show();
        });        
    }
    _updateTables(blocks) {
        const tableBlk = document.getElementById("table-blk");
        let tableBlkRowCount = tableBlk.rows.length - 1;

        if (tableBlkRowCount > 1) {
            for(let i = tableBlkRowCount; i > 0; i--) {
                tableBlk.deleteRow(i);
            }
        }

        blocks.map((block => {
            let blkRow = tableBlk.insertRow(-1);

            blkRow.insertCell(0).appendChild(document.createTextNode(block.hash));
            blkRow.insertCell(1).appendChild(document.createTextNode(block.number));
            blkRow.insertCell(2).appendChild(document.createTextNode(block.transactions.length));
            blkRow.insertCell(3).appendChild(document.createTextNode(moment(new Date(block.timestamp * 1000)).fromNow()));
        }))

        const tableTrx = document.getElementById("table-trx");
        let tableTrxRowCount = tableTrx.rows.length - 1;

        if (tableTrxRowCount > 1) {
            for(let i = tableTrxRowCount; i > 0; i--) {
                tableTrx.deleteRow(i);
            }
        }

        document.getElementById('table-trx-title').innerText = `Transactions of Block ${blocks[0].number}`;

        blocks[0].transactions.map((transaction => {
            let trxRow = tableTrx.insertRow(-1);

            let transactionLink = document.createElement('a');
            //transactionLink.appendChild(document.createTextNode(transaction.hash));
            transactionLink.href = `/transaction/${transaction.hash}`;
            transactionLink.setAttribute('data-navigo', '');
            transactionLink.appendChild(document.createTextNode(transaction.hash));

            trxRow.insertCell(0).appendChild(transactionLink);
            trxRow.insertCell(1).appendChild(document.createTextNode(this._truncate(transaction.from)));
            trxRow.insertCell(2).appendChild(document.createTextNode(this._truncate(transaction.to)));
            trxRow.insertCell(3).appendChild(document.createTextNode(parseFloat(utils.formatEther(transaction.value)).toFixed(3) + " ETH"));
        }))
    }
    _truncate(fullStr,
        strLen = 15,
        separator = "...",
        frontChars = 6,
        backChars = 4) {
        if (typeof fullStr !== 'string') return "";
        if (fullStr.length <= strLen) return fullStr;

        return (
            fullStr.substr(0, frontChars) +
            separator +
            fullStr.substr(fullStr.length - backChars)
        );
    }

}

export { ViewController };