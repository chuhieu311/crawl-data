<template>
  <div class="crawl-data ">
    <loading-dialog :isLoadingOpen="isLoading"></loading-dialog>
    <div class="option-crawl">
      <div class="dropdown left-side">
        <button class="btn btn-primary dropdown-toggle " type="button" data-toggle="dropdown">{{selectedPage.title}}
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li v-for="page in arrPage" :key="page.option">
            <a href="#" @click="selectedPage = page">{{page.title}}</a>
          </li>
        </ul>
        <div style="clear: both;"></div>
      </div>
      <div class="crawl-by">
        <label class="radio-inline">
          <input type="radio" value="1" v-model="isCrawlByUrl">Url
        </label>
        <label class="radio-inline">
          <input type="radio" value="0" v-model="isCrawlByUrl">Upload File
        </label>
      </div>
      <div style="clear: both;"></div>
    </div>
    <input class="form-control input-crawl" type="url" v-model="url" v-if="'1' == isCrawlByUrl">
    <input class="form-control input-crawl" type="file" value="ahhihiihih" v-else>
    <button class="btn btn-primary btn-crawl" @click="crawlData">Crawl Data</button>
    <div class="table-responsive">
      <h1>Dữ liệu</h1>
      <table class="table">
        <tbody>
          <tr>
            <th>Ảnh</th>
            <td><img :src="data.imageUrl" /></td>
          </tr>
          <tr>
            <th>Tiêu đề</th>
            <td>{{data.title}}</td>
          </tr>
          <tr>
            <th>Tác giả</th>
            <td>{{data.author}}</td>
          </tr>
          <tr>
            <th>Mô tả</th>
            <td>{{data.description}}</td>
          </tr>
          <tr>
            <th>Ngày xuất bản</th>
            <td>{{data.publicationDate}}</td>
          </tr>
          <tr>
            <th>Nhà sản xuất</th>
            <td>{{data.manufacturer}}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      selectedPage: null,
      isShowData: false,
      isCrawlByUrl: 1,
      data: {
        title: "",
        imageUrl: "",
        author: "",
        publicationDate: "",
        manufacturer: "",
        description: ""
      }
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
        self.setData(data);
        self.isLoading = false;
        self.isShowData = true;
      }).fail(function() {
        self.isLoading = false;
        self.isShowData = false;
        alert("Có lỗi rồi!!!");
      });
    },
    setData(book) {
      if (1 == this.selectedPage.option) {
        this.setTikiPage(book);
      } else if (2 == this.selectedPage.option) {
        this.setLazadaPage(book);
      } else if (3 == this.selectedPage.option) {
        this.setFahasaPage(book);
      }
    },
    setTikiPage(book) {
      this.data.title = book.title;
      this.data.imageUrl = book.imageUrl;
      this.data.author = book.data[2].value;
      this.data.description = book.description;
      this.data.publicationDate = book.data[7].value;
      this.data.manufacturer = book.data[1].value;
    },
    setLazadaPage(book) {
      var self = this;
      this.data.title = book.title;
      this.data.imageUrl = book.imageUrl;
      this.data.description = book.description;
      var arrData = book.data.map(item => item.split(":"));
      arrData.forEach(element => {
        if (element instanceof Array && element.length == 2) {
          let title = element[0].trim().toLowerCase();
          let value = element[1].trim();
          switch (title) {
            case "tác giả":
              self.data.author = value;
              break;
            case "nhà xuất bản":
              self.data.publicationDate = value;
              break;
            case "phát hành":
              self.data.manufacturer = value;
              break;
          }
        }
      });
      // this.data.author = book.description;
      // this.data.publicationDate = book.data[7].description;
      // this.data.manufacturer = book.data[1].description;
    },
    setFahasaPage(book) {
      this.data.title = book.title;
      this.data.imageUrl = book.imageUrl;
      this.data.author = book.data[2].description;
      this.data.publicationDate = book.data[7].description;
      this.data.manufacturer = book.data[1].description;
    }
  },
  watch: {
    url() {
      let temp = this.url.toLowerCase();
      if (temp.includes("tiki")) {
        this.selectedPage = this.arrPage[0];
      } else if (temp.includes("lazada")) {
        this.selectedPage = this.arrPage[1];
      } else if (temp.includes("fahasa")) {
        this.selectedPage = this.arrPage[2];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$margin-top-item: 20px;
.crawl-data {
  text-align: center;
  .input-crawl {
    margin-top: $margin-top-item;
    display: block;
  }
  .btn-crawl {
    margin-top: $margin-top-item;
    display: block;
  }
  .dropdown-toggle {
    min-width: 150px;
    clear: both;
  }
  .margin-top {
    margin-top: 15px;
  }
  .crawl-by {
    float: left;
    label {
      min-width: 100px;
    }
  }
  table {
    td {
      float: left;
      text-align: left;
      img {
        height: 220px;
      }
    }
    th {
      width: 150px;
    }
  }
}
</style>
