<template>
  <div>
    <div style="margin: 30px auto;width: 70vw;">
      
      
      <el-table
          :data="orderData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="id"
            label="id"
            width="100">
        </el-table-column>
        <el-table-column
            prop="dormAddress"
            label="宿舍地址"
            width="100">
        </el-table-column>
        <el-table-column
            prop="dormNum"
            label="宿舍号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="充值人"
            width="100">
        </el-table-column>
        <el-table-column
            prop="userNum"
            label="充值人学号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="rechargeType"
            label="充值类型"
            width="180"
            :formatter="(row, column, cellValue) => cellValue === 0 ? '电费' : '水费'">
        </el-table-column>
        <el-table-column
            prop="rechargeAmount"
            label="充值金额"
            width="180">
        </el-table-column>
<!--        <el-table-column-->
<!--            fixed="right"-->
<!--            label="操作"-->
<!--            width="120">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button @click="update(scope.row)" type="text" size="small">更新</el-button>-->
<!--            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>



    </div>
  </div>
</template>

<script>

import {request} from "@/api/axios";

export default {
  name: "LoginPage.vue",
  mounted() {
    this.getAllData();
  },
  data(){
    return{
      visible:false,
      orderData:[],
    }
  },
  methods:{
    getAllData(){
      request.post("/costOrders/list",{

      }).then(res => {
        if(res.data.code === 0){
          this.orderData = res.data.data;
        }else {
          this.$message.error("查询失败")
        }
      })
    }
  },
}
</script>

<style scoped>

</style>