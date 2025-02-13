const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: './', // 改为相对路径
  transpileDependencies: true
});
