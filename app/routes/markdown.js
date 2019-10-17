const Router = require('koa-router')
const router = new Router({prefix: '/markdown'})


const { find, create, delete: del } = require('../controllers/markdown')

router.get('/', find)

router.post('/', create)

router.delete('/:id', del)

module.exports = router
