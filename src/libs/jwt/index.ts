// import JWT from "jsonwebtoken";

// class Jwt implements JwtInterface {
// 	secret = process.env.SECRET;

// 	sign = (payload, expiration) => {
// 		return JWT.sign(payload, this.secret, expiration);
// 	}
	
// 	verify = (jwtString) => {
// 		return JWT.verify(jwtString, this.secret);
// 	}
// }

// interface JwtInterface {
// 	secret: string;

// 	sign: (payload: string, expiration?: any) => string;

// 	verify: (jwtString: string) => string
// }

// export default new Jwt();