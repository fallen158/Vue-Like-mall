import Vue from "vue";
import axios from "axios";
import url from "@/modules/js/api.js";

import "@/modules/css/common.css";
import "./index.css";

import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);

import Foot from "@/components/Foot.vue"

new Vue({
  el: "#app",
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoded: false
  },
  methods: {
    getLists() {
      if(this.allLoded) return
      this.loading = true;
      axios
        .get(url.hotList, {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          let curLists = res.data.lists;
          // 判断所有数据是否加载完毕
          if(curLists.lengthh < this.pageSize){
            this.allLoded = false
          }
          if (this.lists) {
            this.lists = this.lists.concat(curLists);
          } else {
            // 第一次请求数据
            this.lists = curLists;
          }
          this.loading = false;
          this.pageNum ++
        });
    }
  },
  created() {
    this.getLists();
  },
  components:{
    Foot
  }
});
