const Koa = require('koa');
const bodyparser = require('koa-bodyparser')
const homeRouter = require('./routes/home')
const userRouter = require('./routes/users')
// Koa 是一个类
const routing = require('./routes')
const app = new Koa();

routing(app);


app.use(bodyparser());
// 所有接口都会支持options请求，是所有，不受prefix限制
// app.use(homeRouter.routes())
// app.use(userRouter.routes())
app.listen(3001);
