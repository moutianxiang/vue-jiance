<template>
    <el-row>
        <el-col :span="8">
            <el-card :body-style="{ padding: '0px' }">
            <img src="../assets/daibanliebiao.jpg" class="image">
            <div style="padding: 10%;">
                <el-badge :value=dbnum class="item">
                    <el-button type="warning" @click="toworkflow()">待办事项</el-button>
                </el-badge>
            </div>
            </el-card>
        </el-col>
        <el-col :span="16">
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
        dbnum: 0,
        zhiwu: sessionStorage.getItem('zhiwu'),
        ygh: sessionStorage.getItem('ygh'),
    }
  },
    mounted:function(){
            this.workflowselect();
        },
  methods: {
    workflowselect:function(){
                var arr = this;
                if(this.ygh == '01'||this.ygh == '02'){
                    var zyygh = ''
                }
                else{
                    var zyygh = this.ygh
                }
                var data = {
                    zhiwu:this.zhiwu,
                    ygh :zyygh
                    }
                axios.post('workflowselect', data).then(function (response) {
                    arr.dbnum = response.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
    toworkflow:function(){
        this.$router.push('/workflowselect')
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