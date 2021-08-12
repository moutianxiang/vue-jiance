<template>
    <el-row>
        <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
            <img src="../assets/daibanliebiao.jpg" class="image">
            <div style="padding: 32px;">
                <el-badge :value=dbnum class="item">
                    <el-button type="text" class="button">待办事项</el-button>
                </el-badge>
            </div>
            </el-card>
        </el-col>
        <el-col :span="16" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
            <el-empty :image-size="300"></el-empty>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
        dbnum: 5,
        zhiwu: sessionStorage.getItem('zhiwu')
    }
  },
    mounted:function(){
            this.workflowselect();
        },
  methods: {
    workflowselect:function(){
                var arr = this;
                var data = {
                    zhiwu:this.zhiwu
                    }
                axios.post('workflowselect', data).then(function (response) {
                    arr.dbnum = response.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
  }
}
</script>

<style>

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: center;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>