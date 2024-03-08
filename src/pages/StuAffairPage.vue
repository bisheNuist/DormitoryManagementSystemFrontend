<template>
  <div>
    <div style="margin: 30px auto;width: 70vw;">

      <div style="margin-bottom: 30px">
        事务类型<el-select v-model="searchForm.affairType" placeholder="">
        <el-option v-for="affair in [{name:'报修',value:1},{name:'晚归申请',value:2},{name:'宿舍调整',value:3},{name:'其他事务',value:0}]" :label="affair.name" :value="affair.value" :key="affair.value">
        </el-option>
      </el-select>
        状态<el-select v-model="searchForm.status" placeholder="">
        <el-option v-for="affair in [{name:'等待审核',value:0},{name:'处理中',value:1},{name:'审核拒绝',value:2},{name:'处理完成',value:3}]" :label="affair.name" :value="affair.value" :key="affair.value">
        </el-option>
      </el-select>
        <el-button @click="getAllData">查询</el-button>
        <el-button @click="add">新增</el-button>
      </div>

      <el-table
          :data="affairData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="userNum"
            label="学号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="学生姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="content"
            label="内容"
            width="180">
        </el-table-column>
        <el-table-column
            prop="affairType"
            label="事务类型"
            width="180"
            :formatter="(row, column, cellValue) => cellValue === 1 ? '报修' : 
             cellValue === 2 ?'晚归申请':cellValue === 3?'宿舍调整':'其他事务'">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="180"
            :formatter="(row, column, cellValue) => cellValue === 0 ? '等待审核' : 
             cellValue === 1 ?'处理中':cellValue === 2?'审核拒绝':'处理完成'">
        </el-table-column>
        <el-table-column
            prop="approvalInfo"
            label="审批信息"
            width="180">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button @click="success(scope.row)" type="text" size="small">批准</el-button>
            <el-button @click="fail(scope.row)" type="text" size="small">不批准</el-button>
            <el-button @click="deleteFair(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
          title="提示"
          :visible.sync="visible"
          width="30%"
      >
        <el-form ref="postInfo" :model="affairForm" label-width="100px">

          <el-form-item label="事务类型">
            <el-select v-model="affairForm.affairType" placeholder="">
              <el-option v-for="affair in [{name:'报修',value:1},{name:'晚归申请',value:2},{name:'宿舍调整',value:3}]" :label="affair.name" :value="affair.value" :key="affair.value">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="affairForm.content" ></el-input>
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
      affairData:[],
      searchForm:{
        affairType: '',
        status: ''
      },
      affairForm:{

      }
    }
  },
  methods:{
    add(){
      this.visible = true;
      this.affairForm = {};
    },
    cancel(){
      this.visible = false;
    },
    getAllData(){
      request.post("/studentAffairs/list",{
        ...this.searchForm
      }).then(res => {
        if(res.data.code === 0){
          this.affairData = res.data.data;
        }else {
          this.$message.error("查询失败")
        }
      })
    },
    success(data){
      request.post("/studentAffairs/approvalSuccess",{
        ...data
      }).then(res => {
        if(res.data.code === 0){
          this.getAllData()
        }
      })
    },
    fail(data){
      request.post("/studentAffairs/approvalFail",{
        ...data
      }).then(res => {
        if(res.data.code === 0){
          this.getAllData()        }
      })
    },
    deleteFair(data){
      request.post("/studentAffairs/delete",{
        ...data
      }).then(res => {
        if(res.data.code === 0){
          this.getAllData()
        }
      })
    },
    onSubmit(){
      if(!this.affairForm.id){
        request.post("/studentAffairs/add",{
          ...this.affairForm
        }).then(res => {
          if(res.data.code === 0){
            this.getAllData();
            this.cancel()
          }else {
            this.$message.error("新增失败")
          }
        })
      }
    }
  },
}
</script>

<style scoped>

</style>