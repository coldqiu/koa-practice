const Koa = require("koa");
const koaBody = require("koa-body");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const koaStatic = require("koa-static");
const path = require("path");
const { connectionStr } = require("./config");

// mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log("MongoDB 连接成功"));
mongoose.connect("mongodb://127.0.0.1:27017", () => console.log("MongoDB 连接成功"));
mongoose.connection.on("error", console.error);
// Koa 是一个类
const routing = require("./routes");
const app = new Koa();

//
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.status = err.status || err.statusCode || 500;
//     ctx.body = {
//       message: err.message
//     }
//   }
// })
app.use(koaStatic(path.join(__dirname, "public")));
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? { ...rest } : { stack, ...rest },
  })
);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads"),
      keepExtensions: true, // 保留图片后缀名
    },
  })
);

// app.use(koaBody()); // 需要放在路由之前
app.use(parameter(app));

routing(app);

// 所有接口都会支持options请求，是所有，不受prefix限制
// app.use(homeRouter.routes())
// app.use(userRouter.routes())
app.listen(3001, () => console.log("程序启动在 3001端口"));
