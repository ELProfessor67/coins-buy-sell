import crypto from 'crypto'

export async function generateOrderID(){
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderid = hash.digest('hex');
    return orderid.substr(0,12);
}