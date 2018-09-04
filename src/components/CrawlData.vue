<template>
  <div class="crawl-data ">
    <loading-dialog :isLoadingOpen="isLoading"></loading-dialog>
    <div class="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{{selectedPage.title}}
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li v-for="page in arrPage" :key="page.option">
          <a href="#" @click="selectedPage = page">{{page.title}}</a>
        </li>
      </ul>
    </div>
    <input class="form-control" type="url" v-model="url">
    <button class="btn btn-primary" @click="crawlData">Crawl Data</button>
  </div>
</template>

<script>
import LoadingDialog from "./dialog/LoadingDialog";
import * as ArrayPage from "./listPage.js";

var Crawler = require("js-crawler");
var crawler = new Crawler().configure({
  ignoreRelative: false,
  depth: 1,
  maxRequestsPerSecond: 2
});

let cheerio = require("cheerio");
let jsonframe = require("jsonframe-cheerio");

export default {
  name: "crawl-data",
  components: { LoadingDialog },
  data() {
    return {
      isLoading: false,
      url:
        "https://tiki.vn/minh-la-ca-viec-cua-minh-la-boi-p763843.html?src=category-page",
      arrPage: ArrayPage.arrPage,
      selectedPage: null
    };
  },
  created() {
    this.selectedPage = this.arrPage[0];
  },
  methods: {
    crawlData() {
      this.isLoading = true;
      var self = this;
      $.get(this.url, function(response) {
        const $ = cheerio.load(response);
        jsonframe($);
        var data = $("body").scrape(self.selectedPage.frame);
        console.log(data);
        self.isLoading = false;
      }).fail(function() {
        self.isLoading = false;
        alert("Có lỗi rồi!!!");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$margin-top-item: 20px;
.crawl-data {
  text-align: center;
  max-width: 80%;
  input {
    margin-top: $margin-top-item;
    display: block;
  }
  button {
    margin-top: $margin-top-item;
    display: block;
  }
  .dropdown-toggle {
    min-width: 150px;
  }
  .margin-top {
    margin-top: 15px;
  }
}
</style>
