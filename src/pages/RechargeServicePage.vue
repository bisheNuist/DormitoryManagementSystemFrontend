<template>
  <div>
    <div style="margin: 30px auto;width: 70vw;">

      <div style="margin-bottom: 30px">
        宿舍号<el-input v-model="searchForm.dormNum" style="width: 200px"></el-input>
        地址<el-input v-model="searchForm.address" style="width: 200px"></el-input>
        <el-button @click="getAllData">查询</el-button>
      </div>

      <el-table
          :data="dormitoryData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="address"
            label="地址"
            width="180">
        </el-table-column>
        <el-table-column
            prop="dormNum"
            label="宿舍号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="scale"
            label="宿舍人数"
            width="180">
        </el-table-column>
        <el-table-column
            prop="electricityFee"
            label="电费"
            width="180">
        </el-table-column>
        <el-table-column
            prop="waterFee"
            label="水费"
            width="180">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button @click="recharge(scope.row)" type="text" size="small">充值</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
          title="提示"
          :visible.sync="visible"
          width="30%"
      >
        <el-form ref="postInfo" :model="dormitoryForm" label-width="100px">

          <el-form-item label="类型">
            <el-select v-model="dormitoryForm.type" placeholder="">
              <el-option v-for="item in [{name:'水费',value:'water'},{name:'电费',value:'electricity'}]" :label="item.name" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="水费">
            <el-input v-model="dormitoryForm.rechargeFee"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
       </span>
      </el-dialog>


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
      dormitoryData:[],
      searchForm:{
        dormNum:'',
        address:''
      },
      dormitoryForm:{

      }
    }
  },
  methods:{
    cancel(){
      this.visible = false;
    },
    getAllData(){
      request.post("/dormitory/list",{
        ...this.searchForm
      }).then(res => {
        if(res.data.code === 0){
          this.dormitoryData = res.data.data;
        }else {
          this.$message.error("查询失败")
        }
      })
    },
    recharge(data){
      this.visible = true;
      this.dormitoryForm.id = data.id
    },
    onSubmit(){
      if(this.dormitoryForm.type === 'water'){
        request.post("/dormitory/rechargeWaterFee",{
          ...this.dormitoryForm
        }).then(res => {
          if(res.data.code === 0){
            this.getAllData()
            this.cancel()
          }else {
            this.$message.error("充值失败")
          }
        })
      }else {
        request.post("/dormitory/rechargeElectricityFee",{
          ...this.dormitoryForm
        }).then(res => {
          if(res.data.code === 0){
            this.getAllData()
            this.cancel()
          }else {
            this.$message.error("充值失败")
          }
        })
      }
    }
  },
}
</script>

<style scoped>

</style>