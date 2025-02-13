<template>
  <div id="app">
    <!--当访问 '/orders', '/address', '/addressEdit', '/addAddress' 这几个页面的时候几个组件会被缓存，因为会频繁切换-->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view :key="$route.fullPath"/>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
    };
  },
};
</script>

<style lang="less">

</style>
