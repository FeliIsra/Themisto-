import * as Router from 'koa-router';
import { getConfig } from '../config/configService';
import { IResponseJob, JobDTO } from '../models/job/jobDTO';
import { executeJob } from '../services/job';
const CryptoJS = require("crypto-js");

const jobsController = new Router();

jobsController.post('/job', async (ctx) => {
	if(!checkAuth(ctx)) return	

	const job: JobDTO = JSON.parse(ctx.request.body).data;

	const response: IResponseJob = await executeJob(job)

	if(!response.error){
		ctx.response.status = 200;
		ctx.body = {
			status: "Succes",
			message: response
		}
	} else {
		ctx.response.status = 500;
		ctx.body = {
			status: "Error",
			message: response.error 
		}
	}

});

const checkAuth = (ctx: any) => {
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

export default jobsController.routes();