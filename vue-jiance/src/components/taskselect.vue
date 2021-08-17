<template>

  <!--所有事项查询-->
    <div id="workflowset" class="workflowresultset">
          <el-dialog title="流程图信息"
               :visible.sync="detailDialogVisible"
               :data="flowdetailinfo"
               width="400px"
               center>
            <el-steps :active="active" finish-status="success">
            <el-step title="员工审批"></el-step>
            <el-step title="CEO审批"></el-step>
            <el-step title="董事长审批"></el-step>
            </el-steps>
            </el-dialog>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>任务列表</el-breadcrumb-item>
        <el-breadcrumb-item>所有任务查询</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      :current-page.sync="currentPage"
                      :stripe="stripe"
                      border style="width: 100%">
                <el-table-column prop="procinstid" label="流程实例ID"></el-table-column>
                <el-table-column prop="ygh" label="发起人员工号"></el-table-column>
                <el-table-column prop="name" label="发起人姓名"></el-table-column>
                <el-table-column prop="bak" label="备注"></el-table-column>
                <el-table-column prop="ceoyj" label="CEO意见"></el-table-column>
                <el-table-column prop="dszyj" label="董事长意见"></el-table-column>
                <el-table-column prop="nodename" label="流程节点"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row,$index}">
                        <el-button size="small" @click="flowDetail(row,$index,detailDialogVisible = true)">流程图</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;margin-top: 30px;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[6, 50, 100]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
            stripe:true,//是否为斑马纹 table
            flowdetailinfo: {},
            tableData:[],
            ygh: sessionStorage.getItem('ygh'),
            username: sessionStorage.getItem('username'),
            zhiwu: sessionStorage.getItem('zhiwu'),
            bak: "",
            detailDialogVisible: false,
            addDialogVisible:false,
            currentPage:1,
            pagesize:6,
            total:0,
            active:0,
    }
  },
  mounted:function(){
            this.workflowselect();
        },
  methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSizeChange(val) {
                this.pagesize=val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            //任务列表查询
            workflowselect:function(){
                var arr = this;
                var data = {
                    ygh :this.ygh
                    }
                axios.post('AllTaskSelect', data).then(function (response) {
                    arr.tableData = response.data;
                    arr.total = response.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            //流程图展示
            flowDetail:function(row,index){
                this.active = row.nodename;
            },
        }
}
</script>

<style>
</style>