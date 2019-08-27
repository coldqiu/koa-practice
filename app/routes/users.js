const Router = require('koa-router');
const router = new Router({prefix: '/users'});
// const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');


const { find, findById, create,
  update, delete: del,
  login, checkOwener
} = require('../controllers/users');

const { secret } = require('../config');

// const auth = async(ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   console.log("authorization", authorization);
//   const token = authorization.replace('Bearer ', '');
//   console.log("secret", secret);
//   try {
//     const user = jsonwebtoken.verify(token, secret);
//     console.log("user", user);
//     ctx.state.user = user;
//   } catch (err) {
//     ctx.throw(401, err.message);
//   }
//   await next();
// }

const auth = jwt({ secret });

router.get('/', find);

router.post('/', create);

router.get('/:id', findById);

router.patch('/:id', auth, checkOwener, update);  // put是整体替换，patch是部分

router.delete('/:id', auth, checkOwener, del);

router.post('/login', login);


module.exports = router;
