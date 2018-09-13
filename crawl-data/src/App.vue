<template>
  <div id="app">
    <div class="row reset-margin">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <crawl-data/>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import CrawlData from "./components/CrawlData.vue";

export default {
  name: "app",
  components: {
    CrawlData
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
</style>
