import { readFileSync } from 'fs';
import { createPrivateKey } from 'crypto';

// Read your PKCS8 private key
const keyPEM = readFileSync('./private_key_pkcs8.pem', 'utf8');

// Tell Node it's PKCS8
const privateKey = createPrivateKey({
  key: keyPEM,
  format: 'pem',
  type: 'pkcs8',       // Important!
  passphrase: undefined // only if the key is unencrypted
});

console.log('Private key loaded successfully:', privateKey);
