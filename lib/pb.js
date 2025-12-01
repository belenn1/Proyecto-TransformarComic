import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090/_/#/collections?collection=pbc_440763926&filter=&sort=-%40rowid'); // Cambia esto con tu URL de PocketBase

export default pb;