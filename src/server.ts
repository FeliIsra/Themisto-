import * as Koa from 'koa';
import * as koaBody from 'koa-body'
import { getConfig } from './config/configService';
import router from './routes';
const port = getConfig('PORT')

const app = new Koa();

app.use(async (ctx, next) => {
    console.log('Url:', ctx.url);
    await next();
});

app.use(koaBody());
app.use(router.routes());

app.listen(port);

console.log(`Server running on port ${port}`);