<template>
  <div>
    <div style="margin: 30px auto;width: 40vw;">
      <el-descriptions class="margin-top" title="个人信息" :column="2" size="middle" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="onShowUpdateForm">修改</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{userInfo.userName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            学号
          </template>
          {{userInfo.userNum}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            学院
          </template>
          {{userInfo.userDepartment}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            宿舍
          </template>
          {{userInfo.dormAddress + "-" + userInfo.dormNum}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            床位
          </template>
          {{userInfo.userBed}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            性别
          </template>
          {{userInfo.gender === 0 ? '男':'女'}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{userInfo.phone}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            身份
          </template>
          {{ userInfo.userRole === 'user' ? '学生' : '管理员' }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            密码
          </template>
          {{ userInfo.userPassword }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <el-dialog
        title="提示"
        :visible.sync="updateFormVisible"
        width="30%"
       >
      <el-form ref="personalForm" :model="personalForm" label-width="100px">
        <el-form-item label="学院">
          <el-input v-model="personalForm.userDepartment" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号">
          <el-input v-model="personalForm.userDormitoryId" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="床位">
          <el-input v-model="personalForm.userBed" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="personalForm.gender" placeholder="">
            <el-option v-for="city in [{name:'男',value:0},{name:'女',value:1}]" :label="city.name" :value="city.value" :key="city.value"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="personalForm.phone" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="personalForm.userPassword" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="cancel">取消</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
import {request} from "@/api/axios";

export default {
  name: "PersonalPage.vue",

  mounted() {
    this.getUserInfo()
  },

  data(){
    return{
      updateFormVisible:false,
      personalForm:{
        userNum:'',
        userDepartment:'',
        userDormitoryId:'',
        dormAddress:'',
        dormNum:'',
        userBed:'',
        gender:null,
        phone:'',
        userRole:'',
        userPassword:''
      },
      userInfo:{

      }
    }
  },
  methods:{
    cancel(){
      this.updateFormVisible = false
    },
    onSubmit(){
      request.post("/user/saveDetail",{
        ...this.personalForm
      }).then(res => {
        if(res.data.code === 0){
          this.$message.info("修改成功")
          this.getUserInfo();
          this.cancel()
        }else {
          this.$message.error("修改失败")
        }
      })
    },
    onShowUpdateForm(){
      this.personalForm = this.userInfo;
      this.updateFormVisible = true
    },
    getUserInfo(){
      request.post("/user/getDetail").then(res => {
        if(res.data.code === 0){
          this.userInfo = res.data.data
        }else {
          this.$message.error("获取失败：" + res.data.message);
        }
      })
    },
    gotoHomePage(){
      this.$router.push(
          {
            path:'/index'
          }
      )
    },
  },
}
</script>

<style scoped>

</style>