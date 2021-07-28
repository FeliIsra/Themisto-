import * as Router from 'koa-router';

const jobsController = new Router();

jobsController.post('/job', async (ctx) => {
	ctx.response.status = 200;
	ctx.body = {
		status: 'succes',
		message: "message"
	}
});

export default jobsController.routes();