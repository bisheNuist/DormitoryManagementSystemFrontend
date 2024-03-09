<template>
  <div>
    <div style="margin: 30px auto;width: 70vw;">

      <div style="margin-bottom: 30px">
        姓名<el-input v-model="searchForm.userName" style="width: 200px"></el-input>
        学号<el-input v-model="searchForm.userNum" style="width: 200px"></el-input>
        宿舍(地址-宿舍号)<el-input v-model="searchForm.userDormitoryId" style="width: 200px"></el-input>
        <el-button @click="getAllData">查询</el-button>
        <el-button @click="add">新增</el-button>
      </div>

      <el-table
          :data="stuData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="userName"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="userNum"
            label="学号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="userDepartment"
            label="学院"
            width="180">
        </el-table-column>
        <el-table-column
            prop="dormAddress"
            label="宿舍地址"
            width="180">
        </el-table-column>
        <el-table-column
            prop="dormNum"
            label="宿舍号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="userBed"
            label="床位"
            width="180">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="180"
            :formatter="(row, column, cellValue) => cellValue === 0 ? '男' : '女'">
        </el-table-column>
        <el-table-column
            prop="userRole"
            label="用户身份"
            width="180"
            :formatter="(row, column, cellValue) => cellValue === 'user' ? '学生' : '管理员'">
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
        <el-form ref="postInfo" :model="stuForm" label-width="100px">
          <el-form-item label="学院">
            <el-input v-model="stuForm.userDepartment" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="stuForm.userName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="宿舍地址">
            <el-input v-model="stuForm.dormAddress" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号">
            <el-input v-model="stuForm.dormNum" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="stuForm.userNum" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="床位">
            <el-input v-model="stuForm.userBed" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="stuForm.gender" placeholder="">
              <el-option v-for="city in [{name:'男',value:0},{name:'女',value:1}]" :label="city.name" :value="city.value" :key="city.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="stuForm.phone" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="stuForm.userPassword" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确定</el-button>
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
      stuData:[],
      searchForm:{
        userNum:'',
        userName:'',
        userDormitoryId:''
      },
      stuForm:{

      }
    }
  },
  methods:{
    add(){
      this.visible = true;
      this.stuForm = {};
    },
    cancel(){
      this.visible = false;
    },
    getAllData(){
      request.post("/user/getList",{
        ...this.searchForm
      }).then(res => {
        if(res.data.code === 0){
          this.stuData = res.data.data;
        }else {
          this.$message.error("查询失败")
        }
      })
    },
    deleteRow(data){
      // todo
      request.post("/user/deleteById",{
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
      this.stuForm = data;
      this.visible = true;
    },
    onSubmit(){
      if(!this.stuForm.id){
        request.post("/user/add",{
          ...this.stuForm
        }).then(res => {
          if(res.data.code === 0){
            this.getAllData();
            this.cancel()
          }else {
            this.$message.error(res.data.message)
          }
        })
      }else {
        request.post("/user/saveDetail",{
          ...this.stuForm
        }).then(res => {
          if(res.data.code === 0){
            this.getAllData();
            this.cancel()
          }else {
            this.$message.error(res.data.message)
          }
        })
      }


    }
  },
}
</script>

<style scoped>

</style>