const Markdown = require('../models/markdown')

class markdownCtl {
  async create(ctx) {
    const { content } = ctx.request.body
    console.log('body', ctx.request.body)
    console.log('content', content)
    await new Markdown(content).save()
    ctx.body = 'str'
  }
  async find(ctx) {
    console.log('adff')
    const content = await Markdown.find()
    ctx.body = 'test string'
  }
}

module.exports = new markdownCtl()
