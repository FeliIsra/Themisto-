import Router = require("koa-router");
import jobsController from "./controllers/job";

const router = new Router({
	prefix: '/api'
});

router.use(jobsController)

export default router;