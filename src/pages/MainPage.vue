<template>
  <div class="carousel">


  </div>
</template>

<script>
import {request} from "@/api/axios";

export default {
  name: "MainPage",
  mounted() {
    this.getAllHelpSeekerData();
    this.getAllAiderData();
  },

  data(){
    return{
      seekerData:[],
      aiderData:[]
    }
  },
  methods:{

    getAllAiderData(){
      request.post("/post/listSeekerPost").then(res => {
        if(res.data.code === 0){
          this.seekerData = res.data.data
        }else {
          this.$message.error("获取求助帖子失败");
        }
      })
    },

    getAllHelpSeekerData(){
      request.post("/post/listHelperPost").then(res => {
        if(res.data.code === 0){
          this.aiderData = res.data.data
        }else {
          this.$message.error("获取帮助者帖子失败");
        }
      })
    }
  }
}
</script>

<style scoped>

.carousel{
  width: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>