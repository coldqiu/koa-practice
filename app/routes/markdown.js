const Router = require('koa-router')
const router = new Router({prefix: '/markdown'})


const { find, create } = require('../controllers/markdown')

router.get('/', find)

router.post('/', create)

module.exports = router
