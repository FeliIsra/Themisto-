import { getConfig } from '../config/configService';
const CryptoJS = require("crypto-js");

export const checkAuth = (ctx: any) => {
	var bytes  = CryptoJS.AES.decrypt(ctx.get('password'), getConfig('SECRET'));
	var originalText = bytes.toString(CryptoJS.enc.Utf8);
	if(originalText !== getConfig('PASS')){
		ctx.response.status = 501;
		ctx.body = {
			status: "Error",
			message:  "Auth error"
		}

		return false
	}
	return true
}

