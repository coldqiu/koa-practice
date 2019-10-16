const User = require('../models/users');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../config')


class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find();
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query;
    console.log("fields", fields);
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    // const populateStr = fields.split(';').filter(f => f).map(f => {
    //   if (f === 'employments') {
    //     return 'employments.company employments.job';
    //   }
    //   if (f === 'educations') {
    //     return 'educations.major educations.school';
    //   }
    //    return f;
    // })                                                                                                                                                                                                                                                                                                                      = fields.split(';').filter();
    // console.log("selectFields", populateStr);
    const user = await User.findById(ctx.params.id).select(selectFields).populate('follow locations business employments.company employments.job employments.major');
    // const user = await User.findById(ctx.params.id).select('+following');

    if (!user) {
      ctx.throw(404, '用户不存在');
    }
    ctx.body = user;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) { ctx.throw(409, '用户已经存在')}
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'string', required: false },
      business: { type: 'string', required: false },
      employments: { type: 'array', itemType: 'object', required: false },
      educations: { type: 'array', itemType: 'object', required: false },
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) { ctx.throw(404); }
    ctx.body = user;
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id, ctx.request.body);
    if (!user) { ctx.throw(404); }
    ctx.status = 204;
  }

  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) { ctx.throw(401, '用户名或密码不正确！')}
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, secret, {expiresIn: '1d' });
    ctx.body = { token }
  }

  async checkOwener(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限')}
    await next();
  }

  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following');
    if (!user) { ctx.throw(404); }
    ctx.body = user.following;
  }

  async listFollowers(ctx) {
    // 获取关注了ctx.params.id 的用户
    const users = await User.find({ following: ctx.params.id });
    ctx.body = users;
  }

  // 检查用户存在与否
  async checkUserExist(ctx, next) {
    // mongodb自动生成的id是有规则的
    if (ctx.params.id.length !== 24) { ctx.throw(404, '用户id错误'); }
    const user = await User.findById(ctx.params.id);
    console.log("user", user);
    if (!user) { ctx.throw(404, '用户不存在') }
    await next();
  }

  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following');
    if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      // 不能拿mongodb 自带的数据类型和 js的数据类型做includes
      // me.following.includes(ctx.params.id) 错误写法
      // 使用mongoose 提供的map()方法转换数据类型
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }

  async unFollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following');
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
    if (!index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
}

module.exports = new UsersCtl();
