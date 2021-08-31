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
            <div class="righttop" ref="charts">
      
            </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
        dbnum: 0,
        zhiwu: sessionStorage.getItem('zhiwu'),
        ygh: sessionStorage.getItem('ygh'),
        zbl:[30,40,50,60,70],
    }
  },
    mounted(){
            this.workflowselect();
            this.mycharts();
        },
  methods: {
    workflowselect(){
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
    toworkflow(){
        this.$router.push('/workflowselect')
    },


    //插入柱状图
    mycharts(){
        let myChart =echarts.init(this.$refs.charts,"macarons");
            myChart.setOption(
                {
                    color:['rgb(8,252,7)','rgb(255,168,0)','rgb(0,121,254)','rgb(0,255,251)'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            crossStyle: {
                                color: '#999'
                            }
                        },
                        
                        position: function(pt) { //提示框的位置
                        return [pt[0], 30];
                        }
                    },
                     grid: { //图表和父盒子之间的距离
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top:'17%',
                        containLabel: true
                    },
                    legend: {//图例
                        data: [
                            {
                                name:'完成值',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            {
                                name: '计划值',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            {
                                name: '同期值',
                                textStyle: {
                                    color: '#fff'
                                }
                            },{
                                name: '上期值',
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        ]
                    },
                    xAxis:{ //x轴
                            type: 'category',
                            // boundaryGap: false,
                            data: ['张变玲', '张玲', '王相超', 'test'],
                            axisLabel: { 
                                interval:0,
                                textStyle: {
                                color: '#fff',
                                    fontSize :10
                                },
                                margin:8
                            },
                            axisLine:{
                                show :true,
                                lineStyle:{
                                    color:'rgb(2,121,253)'
                                }
                            },
                            axisTick:{
                                show :false,
                            }
                        },
                    yAxis:{
                            type: 'value',
                             axisLabel: { //x轴的坐标文字
                            show: true,
                            textStyle: {
                                color: '#fff' //文字的颜色
                                },
                                
                            },
                            max:100,
                            axisLine:{
                                show :true,
                                lineStyle:{
                                    color:'rgb(2,121,253)'
                                }
                            },
                            axisTick:{
                                show :false,
                            },
                            splitLine:{  //坐标在grid区域的分割线
                            　 lineStyle: { //设置分割线的样式(图表横线颜色)
                                    color: ['#153a8a']
                                }
                            }
                    },
                    series: [
                        {
                            name: '完成值',
                            type: 'bar', //柱状图
                            data: this.zbl,
                            barWidth :'8%' //柱状体的宽度
                        },
                        {
                            name: '计划值',
                            type: 'bar',
                            data: [20,50,60,40,40],
                            barWidth :'8%'  
                        },
                        {
                            name: '同期值',
                            type: 'bar',
                            data: [60,50,40,30,20],
                            barWidth :'8%'
                        },
                        {
                            name: '上期值',
                            type: 'bar',
                            data: [50,70,60,30,40],
                            barWidth :'8%',
                           
                        },
                    
                    ]
                }
            )
            //让图表自适应
            window.addEventListener("resize",function(){
                myChart.resize()  // myChart 是实例对象
            })
        }
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

  .righttop{
    width: 100%;
	  height: 500px;
	  background: rgb(14, 51, 129);
  }
</style>