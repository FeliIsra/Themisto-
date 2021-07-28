import * as Router from 'koa-router';

const jobsController = new Router();

jobsController.post('/job', async (ctx) => {
	ctx.body = "helo word!"; 
});

export default jobsController.routes();