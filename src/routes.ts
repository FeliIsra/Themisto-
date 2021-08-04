import Router = require("koa-router");
import jobsController from "./controllers/job";
import pingController from "./controllers/ping";

const router = new Router({
	prefix: '/api'
});

router.use(jobsController)
router.use(pingController)

export default router;