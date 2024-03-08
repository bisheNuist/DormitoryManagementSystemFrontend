<template>
  <div>
    <div style="width: 50vw;background-color:#b2d5e8;margin: 10vh auto;border-radius: 20px;padding-bottom: 30px">
      <div >
        <div style="width: 100%;text-align: center;padding-top: 20px;font-size: 23px;color: white">
          欢迎注册
        </div>
        <div style="margin-top: 40px;width: 100%;text-align: center">
          <span style="font-size: 16px;text-align: left;margin-right: 40px;color: white">用户名</span>
          <el-input v-model="registerForm.userName" placeholder="请输入用户名" style="width: 200px"></el-input>
        </div>
        <div style="margin-top: 40px;width: 100%;text-align: center">
          <span style="font-size: 16px;text-align: left;margin-right: 40px;color: white">密码</span>
          <el-input v-model="registerForm.userPassword" placeholder="请输入密码" style="width: 200px" show-password></el-input>
        </div>

        <div style="margin-top: 40px;width: 100%;text-align: center">
          <span style="font-size: 16px;text-align: left;margin-right: 40px;color: white">学号</span>
          <el-input v-model="registerForm.userNum" placeholder="请输入学号" style="width: 200px" ></el-input>
        </div>
      </div>

      <div style="margin-top: 40px;width: 100%;text-align: center">
        <el-button @click="register">注册</el-button>
        <el-button @click="gotoLogin">登录</el-button>
<!--        <el-button @click="gotoHomePage">主页</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import {request} from "@/api/axios";

export default {
  name: "LoginPage.vue",
  data(){
    return{
      registerForm:{
        userName:'',
        userPassword:'',
        userNum:''
      }
    }
  },
  methods:{
    register(){
      if(
          this.registerForm.userName === '' ||
          this.registerForm.userPassword === '' ||
          this.registerForm.userNum === ''
      ){
        this.$message.warning("信息非空");
        return;
      }
      request.post("/user/register",{
        ...this.registerForm
      }).then(res => {
        if(res.data.code === 0){
          this.$message.info("注册成功");
          this.gotoLogin();
        }else {
          this.$message.error("登录失败：" + res.data.message);
        }
      })
    },
    gotoLogin(){
      this.$router.push(
          {
            path:'/login'
          }
      )
    },
    gotoHomePage(){
      this.$router.push(
          {
            path:'/mainPage'
          }
      )
    },
  },
}
</script>

<style scoped>

</style>