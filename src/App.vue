<template lang="pug">
#app
  a#header(href="javascript:void(0);",@click="changeImgArr" title="china sexy lady!") More Sexy Lady ! Click to Refresh!
  //- button(:style="{position:'fixed',zIndex:10000}", @click="changeImgArr") Refresh
  #content
    //- vue-waterfall-easy(ref="waterfall",:imgsArr="imgsArr",@scrollReachBottom="getData", @click="clickFn", :enablePullDownEvent="true", @pullDownMove="pullDownMove",@pullDownEnd="pullDownEnd")
    vue-waterfall-easy(ref="waterfall",:imgsArr="imgsArr",:imgWidth=240,:maxCols=8,:isRouterLink="true",@scrollReachBottom="getData", @click="clickFn", @imgError="imgErrorFn")
      .img-info(slot-scope="props")
        p.some-info {{props.value.info}}

      //-div(slot="waterfall-head")
        h1 waterfall-head
        h1 waterfall-head

    //- 自定义加载动画
    //-div(slot="loading" slot-scope="{isFirstLoad}")
      div(slot="loading" v-if="isFirstLoad") first-loading...
      div(v-else) loading...
</template>

<script>
import vueWaterfallEasy from './vue-waterfall-easy/vue-waterfall-easy.vue'
import axios from 'axios'
export default {
  name: 'app',
  data() {  
    return {
      imgsArr: [],
      group: {
        page : 0,
        pageSize : 50
      }, // 当前加载的加载图片的次数
      pullDownDistance: 0
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData() {
      axios.get('/api?page=' + this.group.page+"&pageSize="+this.group.pageSize) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个静态json文件模拟
        .then(res => {
          if (res.data == null) { // 模拟已经无新数据，显示 slot="waterfall-over"
            this.$refs.waterfall.waterfallOver()
            return
          }
          this.group.page++
          this.imgsArr = this.imgsArr.concat(res.data)
        })
    },
    clickFn(event, { index, value }) {
      // event.preventDefault()
      if (event.target.tagName.toLowerCase() == 'img') {
        console.log('img clicked', index, value)
      }
    },
    imgErrorFn(imgItem){
      console.log('图片加载错误',imgItem)
    },
    changeImgArr() {
      var pageNo=Math.round(Math.random()*50); 
      axios.get('/api?page=' + pageNo+"&pageSize="+this.group.pageSize) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个静态json文件模拟
        .then(res => {
          this.imgsArr = res.data
        })
    },
    pullDownMove(pullDownDistance) {
      // console.log('pullDownDistance', pullDownDistance)
      this.pullDownDistance = pullDownDistance
    },
    pullDownEnd(pullDownDistance) {
      console.log('pullDownEnd')
      if(this.pullDownDistance>50){
        alert('下拉刷新')
      }
      this.pullDownDistance = 0
    },
  },
  created() {
    this.getData()

    // 删除某个卡片
    // setTimeout(()=>{
    //   this.imgsArr.splice(1,1)
    // },2000)
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

a {
  color: #000;
  text-decoration: none;
  &:active {
    color: #000;
  }
}
html,
body,
#app {
  height: 100%;
}

#app {
  position: relative;
  #header {
    display: block;
    text-align: center;
    background: #000;
    color: #cccccc;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    position: fixed;
    z-index: 999;
    width: 100%;
  }
  #content {
    position: absolute;
    top: 32px;
    bottom: 0;
    width: 100%;
  }
}
// .__err__ .img-wraper {
//   background: url(/static/img/1.jpg) no-repeat center/100px 100px !important;
// }
#app {
  overflow: auto;
  position: relative;
  .some-info {
    line-height: 1.6;
    text-align: center;
  }
}
</style>
