const Router = require('koa-router');
const router = new Router({prefix: '/users'});
const jwt = require('koa-jwt');


const { find, findById, create,
  update, delete: del, login,
  checkOwener, listFollowing, checkUserExist,
  unFollow, follow, listFollowers
} = require('../controllers/users');

const { secret } = require('../config');

// const auth = async(ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   console.log("authorization", authorization);
// //   const token = authorization.replace('Bearer ', '');
// //   console.log("secret", secret);
// //   try {
// //     const user = jsonwebtoken.verify(token, secret);
// //     console.log("user", user);
// //     ctx.state.user = user;
// //   } catch (err) {
// //     ctx.throw(401, err.message);
// //   }
// //   await next();
// // }

const auth = jwt({ secret });

router.get('/', find);

router.post('/', create);

router.get('/:id', findById);

router.patch('/:id', auth, checkOwener, update);  // put是整体替换，patch是部分

router.delete('/:id', auth, checkOwener, del);

router.post('/login', login);

router.get('/:id/following', listFollowing) // 获取用户的关注列表

router.get('/:id/followers', listFollowers) // 获取用户的粉丝列表


router.put('/following/:id', auth, checkUserExist, follow); // 关注某个用户

router.put('/unfollow/:id', auth, checkUserExist, unFollow);

module.exports = router;
