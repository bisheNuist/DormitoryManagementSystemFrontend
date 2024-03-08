<template>
  <div>
    <div style="margin: 30px auto;width: 70vw;">

      <div style="margin-bottom: 30px">
        宿舍号<el-input v-model="searchForm.dormNum" style="width: 200px"></el-input>
        地址<el-input v-model="searchForm.address" style="width: 200px"></el-input>
        <el-button @click="getAllData">查询</el-button>
        <el-button @click="add">新增</el-button>
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
            <el-button @click="update(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
          title="提示"
          :visible.sync="visible"
          width="30%"
      >
        <el-form ref="postInfo" :model="dormitoryForm" label-width="100px">
          <el-form-item label="地址">
            <el-input v-model="dormitoryForm.address" ></el-input>
          </el-form-item>
          <el-form-item label="宿舍号">
            <el-input v-model="dormitoryForm.dormNum" ></el-input>
          </el-form-item>
          <el-form-item label="人数">
            <el-input v-model="dormitoryForm.scale"></el-input>
          </el-form-item>
          <el-form-item label="电费">
            <el-input v-model="dormitoryForm.electricityFee"></el-input>
          </el-form-item>
          <el-form-item label="水费">
            <el-input v-model="dormitoryForm.waterFee"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
    add(){
      this.visible = true;
      this.dormitoryForm = {};
    },
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
    deleteRow(data){
      request.post("/dormitory/deleteById",{
        id:data.id
      }).then(res => {
        if(res.data.code === 0){
          this.getAllData();
          this.cancel()
        }else {
          this.$message.error("新增失败")
        }
      })
    },
    update(data){
      this.dormitoryForm = data;
      this.visible = true;
    },
    onSubmit(){
      if(!this.dormitoryForm.id){
        request.post("/dormitory/add",{
          ...this.dormitoryForm
        }).then(res => {
          if(res.data.code === 0){
            this.getAllData();
            this.cancel()
          }else {
            this.$message.error("新增失败")
          }
        })
      }else {
        request.post("/dormitory/update",{
          ...this.dormitoryForm
        }).then(res => {
          if(res.data.code === 0){
            this.getAllData();
            this.cancel()
          }else {
            this.$message.error("更新失败")
          }
        })
      }


    }
  },
}
</script>

<style scoped>

</style>