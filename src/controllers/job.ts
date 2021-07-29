import * as Router from 'koa-router';
import { IResponseJob, JobDTO } from '../models/job/jobDTO';
import { executeJob } from '../services/job';

const jobsController = new Router();

jobsController.post('/job', async (ctx) => {
	const job: JobDTO = JSON.parse(ctx.request.body).data;

	const response: IResponseJob = executeJob(job)

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