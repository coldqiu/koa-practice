class HomeCtl {
    index(ctx) {
        ctx.body= '<h1>主页this</h1>'
    }
}

module.exports = new HomeCtl();
