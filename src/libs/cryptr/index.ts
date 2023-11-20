const Cryptr = require('cryptr');

class Crypto implements CryptoInterface {
	cryptr = new Cryptr(process.env.SECRET, {
		pbkdf2Iterations: 10000, saltLength: 10
	});

	encrypt = (rawData: string) => {
		return this.cryptr.encrypt(rawData);
	}

	decrypt = (cipherData: string) => {
		return this.cryptr.decrypt(cipherData);
	}
}

interface CryptoInterface {
	cryptr: any;

	encrypt: (rawData: string) => string;

	decrypt: (cipherData: string) => string;
}

const CryptoObject = new Crypto();

export default CryptoObject;