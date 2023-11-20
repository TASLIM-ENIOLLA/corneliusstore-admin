async function HMAC_SHA256_HEX(secret: string, message: string): Promise <string>  {
	const enc: any = new TextEncoder();
  const algorithm: { name: string, hash: string } = { name: "HMAC", hash: "SHA-256" };
  const key: any = await crypto.subtle.importKey("raw", enc.encode(secret), algorithm, false, ["sign", "verify"]);

  const hashBuffer: any = await crypto.subtle.sign(algorithm.name, key, enc.encode(message));
  const hashArray: any [] = Array.from(new Uint8Array(hashBuffer));
  const hashHex: string = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex + '---';
}

class JWT{
  raw_payload: string = '';
  secret: string = process.env.SECRET as string;
  
  raw_header: { timestamp: string | number } = { timestamp: new Date().getTime() }

  sign = async (payload: string): Promise <string> => {
    this.raw_payload = payload as string;

    const base64URL: any = new Base64URL();

    const base64UrlHeader: string = base64URL.encode(JSON.stringify(this.raw_header));
    const base64UrlPayload: string = base64URL.encode(JSON.stringify(this.raw_payload));
    const base64UrlSignature: string = base64URL.encode(await HMAC_SHA256_HEX(
	    this.secret,
	    `${base64UrlHeader}.${base64UrlPayload}`
    ));

    return `${base64UrlHeader}.${base64UrlPayload}.${base64UrlSignature}`
  }

  verify = async (jwt: string): Promise <string | undefined> => {
  	const [ header, payload, signature ] = jwt.split(".") as [ string, string, string ];

  	const base64URL: any = new Base64URL();

  	const rawHeader: string = base64URL.decode(header);
    const rawPayload: string = base64URL.decode(payload);
    
    const base64UrlSignature: string = base64URL.encode(await HMAC_SHA256_HEX(
	    this.secret,
	    `${header}.${payload}`
    ));

    if(base64UrlSignature === signature) {
    	return rawPayload
    }
  }
}


class Base64URL {
  encode = (string: string) => btoa(string).replace(/\+/g, '_').replace(/\//g, '-').replace(/=+$/g, '');
  decode = (string: string) => atob(string.replace(/\_/g, '+').replace(/\-/g, '/'));
}

const JWTObject = new JWT();

export default JWTObject;