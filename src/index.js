// Import all plugins
import * as bootstrap from 'bootstrap';
import { utils } from 'ethers';
import '../scss/custom.scss';
import Navigo from 'navigo';
import { Modal } from 'bootstrap';
import { ViewController } from './js/viewcontroller';

const vc = new ViewController();
const router = new Navigo('/');

router.on('/', function () {
    vc.routeHome();
});

router.on('/transaction/:trxhash', function (match) {
    const transactionHash = match.data.trxhash;

    if(transactionHash === "undefined" || !transactionHash) {
        router.navigate('/');
        return;
    }

    vc.routeTransaction(transactionHash);

    vc.loadBlocks();
});

router.resolve();

document.getElementById('modal-trx').addEventListener('hidden.bs.modal', (event) => {
    router.navigate('/');
    document.getElementById('search').value = '';
});
document.getElementById('search').addEventListener('search', (event) => {
    const searchQuery = document.getElementById('search').value;
    router.navigate(`/transaction/${searchQuery}`);
});

setInterval(() => {
    vc.loadBlocks();
}, 3000);