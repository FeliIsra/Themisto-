import * as Router from 'koa-router';
import { IResponseJob, JobDTO } from '../models/job/jobDTO';
import { executeJob } from '../services/job';
import { checkAuth } from '../config/auth'

const jobsController = new Router();

jobsController.post('/job', async (ctx) => {

	ctx.request.socket.setTimeout(5*60*1000)

	console.log("Llega request")
	if(!checkAuth(ctx)) return	
	console.log("Pasa Auth")

	const job: JobDTO = JSON.parse(ctx.request.body).data;
	console.log("Job", job)

	const response: IResponseJob = await executeJob(job)
	console.log("Response", response)

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

export default jobsController.routes();