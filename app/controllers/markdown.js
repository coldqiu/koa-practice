const Markdown = require('../models/markdown')

class markdownCtl {
  async create(ctx) {
    const { content } = ctx.request.body
    if (content) {
      await new Markdown(ctx.request.body).save()
    }
    ctx.body = (content ? content : '消息为空')
  }
  async find(ctx) {
    const content = await Markdown.find()
    ctx.body = content
  }
  async delete(ctx) {
    console.log('id', ctx.params.id)
    const article = await Markdown.findByIdAndRemove(ctx.params.id)
    if (!article) { ctx.throw(404); }
    ctx.status = 204;
  }
}

module.exports = new markdownCtl()
