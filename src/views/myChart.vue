<template>
    <div class="Warp">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName"  type="card" style="margin-top: 20px">
        <el-tab-pane label="全部商品" name="first"></el-tab-pane>
      </el-tabs>
      <el-card class="box-card" v-for="(item,index) in cartLists" :key="index" style="margin-top: 10px">
        <div class="cardWarp">
          <div class="cardimg" style=""></div>
          <div style="flex: 1">{{item.productName}}</div>
          <div style="flex: 1">{{item.salePrice}}</div>
          <el-input-number size="mini" v-model="item.productNum"></el-input-number>
          <div style="flex: 1">{{item.salePrice * item.productNum}}</div>
          <div class="iconfont icon-lajixiang removeCart" style="cursor: pointer" @click="remove(item.productId)"></div>
        </div>
      </el-card>
      <el-dialog
        title="提示"
        :visible.sync="removeDialogVisible"
        width="30%">
        <span>是否删除此商品？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="removeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="removeClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'myChart',
  data () {
    return {
      activeName: 'first',
      cartLists: [],
      removeDialogVisible: false,
      pid: ''
    }
  },
  created () {
    this.getCartList()
  },
  methods: {
    getCartList () {
      // var self = this
      axios.get('/users/cartList').then((response) => {
        console.log(response.data)
        if (response.data.status === '0') {
          this.cartLists = response.data.result
        }
      })
    },
    remove (id) {
      this.removeDialogVisible = true
      this.pid = id
    },
    removeClick () {
      axios.post('/users/cartDel', {
        productId: this.pid
      }).then((response) => {
        console.log(response.data)
        if (response.data.status === '0') {
          this.getCartList()
          this.removeDialogVisible = false
        }
      })
      // console.log(this.pid)
    }
  }
}
</script>

<style scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 671126 */
    src: url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.eot');
    src: url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.woff') format('woff'),
    url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_671126_r5j1ixnq3m29be29.svg#iconfont') format('svg');
  }
  .Warp{
    max-width: 1024px;
    margin: 0 auto;
  }
  .cardWarp{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .cardimg{
    width: 100px;
    height: 100px;
    background: pink;
    border-radius: 50%;
  }
  .removeCart{
    color: black;
  }
  .removeCart:hover{
    color:red
  }
</style>
