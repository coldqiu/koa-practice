const db = [{name: '李雷'}]

class UsersCtl {
    find(ctx) {
        ctx.body = db;
    }
    findById(ctx) {
        console.log("id", ctx.params.id)
        ctx.body = db[ctx.params.id * 1]
    }
    create(ctx) {
        console.log("ctx.request.body", ctx.request.body);
        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        console.log("修改", db[ctx.params.id])
        db[ctx.params.id] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    delete(ctx) {
        console.log("id", ctx.params.id);
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
    }
}

module.exports = new UsersCtl();
