import { readFileSync, writeFileSync } from 'fs';
import crypto from 'crypto';

const keyText = readFileSync('private_key.pem.txt', 'utf8');

// Attempt to convert to PKCS#8
const keyObj = crypto.createPrivateKey({
  key: keyText,
  format: 'pem',
  type: 'pkcs1' // Only works if it's a PKCS#1 key
});

const pkcs8Pem = keyObj.export({
  type: 'pkcs8',
  format: 'pem'
});

writeFileSync('private_key_pkcs8.pem.txt', pkcs8Pem);
console.log('PKCS#8 key written!');
