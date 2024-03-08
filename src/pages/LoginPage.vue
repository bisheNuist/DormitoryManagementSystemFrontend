<template>
  <div>
    <div style="width: 50vw;height: 40vh;background-color:#b2d5e8;margin: 20vh auto;border-radius: 20px">
      <div >
        <div style="width: 100%;text-align: center;padding-top: 20px;font-size: 23px;color: white">
          欢迎登录
        </div>
        <div style="margin-top: 40px;width: 100%;text-align: center">
          <span style="font-size: 16px;text-align: left;margin-right: 40px;color: white">学号</span>
          <el-input v-model="loginForm.userNum" placeholder="请输入学号" style="width: 200px"></el-input>
        </div>
        <div style="margin-top: 40px;width: 100%;text-align: center">
          <span style="font-size: 16px;text-align: left;margin-right: 40px;color: white">密码</span>
          <el-input v-model="loginForm.userPassword" placeholder="请输入密码" style="width: 200px" show-password></el-input>
        </div>
      </div>

      <div style="margin-top: 40px;width: 100%;text-align: center">
        <el-button @click="login">登录</el-button>
        <el-button @click="gotoRegister">注册</el-button>
<!--        <el-button @click="gotoHomePage">主页</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
// import {request} from "@/api/axios";

import {request} from "@/api/axios";

export default {
  name: "LoginPage.vue",
  data(){
    return{
      loginForm:{
        userName:'',
        userPassword:''
      }
    }
  },
  methods:{
    login(){
      if(
          this.loginForm.userNum === '' ||
          this.loginForm.userPassword === ''
      ){
        this.$message.warning("信息非空");
        return;
      }
      request.post("/user/login",{
        ...this.loginForm
      }).then(res => {
        if(res.data.code === 0){
          this.$message.info("登录成功");
          this.gotoHomePage()
        }else {
          this.$message.error("登录失败：" + res.data.message);
        }
      })
    },
    gotoRegister(){
      this.$router.push(
          {
            path:'/register'
          }
      )
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