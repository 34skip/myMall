<template>
  <div class="hello">
    <!--<router-view></router-view>-->
    <!--<Dbtn :num="num" @plusup="plus"></Dbtn>-->
    <!--<div @click="reasource ">reasource </div>-->
    <el-button v-if="loginType === '已登录'" type="text">{{userName}}
      <i class="iconfont icon-gouwuche" @click="gochart"></i>
    </el-button>
    <el-button v-if="loginType === '未登录'" type="text" @click="dialogVisible = true">登录</el-button>
    <el-button v-if="loginType === '已登录'" type="text" @click="loginOut">登出</el-button>
    <div>{{loginType}}</div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="account" placeholder="账号"></el-input>
      <el-input v-model="password" placeholder="密码"></el-input>
      <div>{{msg}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>
    <div class="priceFont" @click="sortclick">price=>sort</div>
    <div>
      <div @click="pricelevel(all)">all</div>
      <div @click="pricelevel(0)">0-100</div>
      <div @click="pricelevel(1)">100-500</div>
      <div @click="pricelevel(2)">500-1000</div>
      <div @click="pricelevel(3)">1000-5000</div>
    </div>
    <div class="flexwrap">
      <div v-for="(item,index) in lists" :key="index" class="listWrap">
        <div>name: {{item.productName}}</div>
        <div>price:{{item.salePrice}}</div>
        <div>id:{{item.productId}}</div>
        <div @click="addCart(item.productId)">加入购物车</div>
      </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="200">
      <div v-show="loading">loading...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dbtn from '../components/Dbtn'
export default {
  name: 'HelloWorld',
  data () {
    return {
      num: '10',
      lists: [],
      sort: true,
      page: 1,
      pageSize: 4,
      busy: false,
      loading: false,
      pricelv: 'all',
      account: '',
      password: '',
      msg: '',
      loginType: '未登录',
      dialogVisible: false
    }
  },
  components: {
    Dbtn
  },
  mounted () {
    this.getlists()
    this.cheackLogin()
  },
  methods: {
    gochart () {
      //  跳转到购物车
      this.$router.push('/myChart')
    },
    cheackLogin () {
      var self = this
      axios.get('/users/cheacklogin').then((response) => {
        console.log(response.data)
        var res = response.data
        if (res.status === '0') {
          self.loginType = '已登录'
          self.userName = res.result
          console.log(res)
        } else {
          self.loginType = '未登录'
        }
      })
    },
    login () {
      var self = this
      if (!this.account || !this.password) {
        this.msg = '请输入账号密码'
        return
      }
      this.dialogVisible = false
      axios.post('/users/login', {
        userName: this.account,
        userPwd: this.password
      }).then((response) => {
        console.log(response.data)
        var res = response.data
        if (res.status === '0') {
          self.userName = res.result.userName
          self.loginType = '已登录'
          console.log(res)
        }
      })
    },
    loginOut () {
      var self = this
      axios.post('/users/loginout').then((response) => {
        console.log(response.data)
        var res = response.data
        if (res.status === '0') {
          self.loginType = '未登录'
          console.log(res)
        }
      })
    },
    getlists (flag) {
      var self = this
      this.loading = true
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sort ? 1 : -1,
        pricelv: this.pricelv
      }
      axios.get('/goods/list', {
        params: param
      }).then((response) => {
        console.log(response.data)
        this.loading = false
        if (flag) {
          this.lists = this.lists.concat(response.data.result.list)
          if (response.data.result.count === 0) {
            this.busy = true
          } else {
            if (response.data.result.count < self.pageSize) {
              this.busy = true
            } else {
              this.busy = false
            }
          }
        } else {
          this.lists = response.data.result.list
          this.busy = false
        }
      })
    },
    sortclick () {
      this.sort = !this.sort
      this.page = 1
      this.getlists()
    },
    plus () {
      this.num++
      console.log(this.num)
    },
    loadMore () {
      this.busy = true

      setTimeout(() => {
        this.page++
        this.getlists(true)
      }, 500)
    },
    pricelevel (index) {
      this.page = 1
      this.pricelv = index
      this.getlists()
    },
    addCart (productId) {
      // 加入购物车
      console.log(productId)
      axios.post('/goods/addCart', {
        productId: productId
      }).then((re) => {
        var res = re.data
        if (res.status === 0) {
          console.log(res)
        } else {
          console.log(123)
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    reasource () {
      this.$http.get('/someUrl').then(response => {
        // get body data
        this.someData = response.body
      }, response => {
        // error callback
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 671126 */
    src: url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.eot');
    src: url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.woff') format('woff'),
    url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.svg#iconfont') format('svg');
  }
.listWrap{
  width: 400px;
  height: 400px;
  background: azure;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.listWrap:hover{
  background: cornflowerblue;
}
.flexwrap{
  /*width: 1000px;*/
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap
}
.priceFont{
  color: red;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 24px;
}
</style>
