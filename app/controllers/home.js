const path = require('path');


class HomeCtl {
    index(ctx) {
        ctx.body= '<h1>主页this</h1>'
    }
    upload(ctx) {
      const file = ctx.request.files.file;
      const baseName = path.basename(file.path);
      console.log("baseName", baseName);
      ctx.body = { url: `${ctx.origin}/uploads/${baseName}`, file: ctx.request.files.file};
    }
}

module.exports = new HomeCtl();
