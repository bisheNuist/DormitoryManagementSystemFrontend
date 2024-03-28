<template>
  <div style="display: flex;flex-direction: row;width: 100%">
    <el-menu
        router
        style="width: 14vw;height: 100vh"
        default-active="1"
        class="el-menu-vertical-demo">
      <el-menu-item index="personal">
        <i class="el-icon-menu"></i>
        <span slot="title">个人信息修改</span>
      </el-menu-item>
      <el-menu-item index="dormitory" v-show="userRole === 'admin'">
        <i class="el-icon-menu"></i>
        <span slot="title">宿舍信息管理</span>
      </el-menu-item>
      <el-menu-item index="student" v-show="userRole === 'admin'">
        <i class="el-icon-menu"></i>
        <span slot="title">学生信息管理</span>
      </el-menu-item>
      <el-menu-item index="stuAffair" v-show="userRole === 'admin'">
        <i class="el-icon-menu"></i>
        <span slot="title">宿舍事务处理</span>
      </el-menu-item>
      <el-menu-item index="recharge" v-show="userRole === 'user'">
        <i class="el-icon-menu"></i>
        <span slot="title">充值服务</span>
      </el-menu-item>
      <el-menu-item index="apply" v-show="userRole === 'user'">
        <i class="el-icon-menu"></i>
        <span slot="title">申请服务</span>
      </el-menu-item>
      <el-menu-item index="order">
        <i class="el-icon-menu"></i>
        <span slot="title">订单查询</span>
      </el-menu-item>
    </el-menu>
    <div style="width: 100%">
      <div style="width: 100%;height: 70px;background-color:rgba(255,255,255,0.63);display: flex;flex-direction: row;">
        <span style="margin-left: 90%;font-size: 23px;line-height: 70px;cursor: pointer" @click="logout">
          登出
        </span>
      </div>
      <div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

import {request} from "@/api/axios";

export default {
  name: 'IndexPage',
  mounted() {
    this.getUserDetail()
  },
  data(){
    return{
      msg:'index',
      userRole:''
    }
  },

  methods:{
    getUserDetail(){
      request.post("/user/getDetail").then(res => {
        if(res.data.code === 0){
          this.userRole = res.data.data.userRole
        }else {
          this.$message.error("获取失败：" + res.data.message);
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
    logout(){
      request.post("/user/logout",{
      }).then(res => {
        if(res.data.code === 0){
          this.$message.info("登出成功");
          this.gotoLogin();
        }else {
          this.$message.error("登录失败：" + res.data.message);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
