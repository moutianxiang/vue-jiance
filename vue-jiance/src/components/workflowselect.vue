<template>
<div id="workflowinfo" class="moddialog">
<!--流程新增对话框-->
    <el-dialog title="发起流程信息"
               :visible.sync="addDialogVisible"
               width="400px"
               center>
    <br>
    <label>员工号：</label><input id="workflowaddygh" type="text" v-model="ygh" disabled>
    <br><br>
    <label>员工名称：</label><input id="workflowaddname" type="text" v-model="username" disabled>
    <br><br>
    <label>备注：</label><input id="workflowaddbak" type="text" v-model="bak">
    <br>
    <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="workflowdialogaddsubmit(addDialogVisible = false)">提交</el-button>
        <el-button type="info" @click="addDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>
<!--流程详情对话框-->
    <el-dialog title="流程详情信息"
               :visible.sync="detailDialogVisible"
               :data="flowdetailinfo"
               width="400px"
               center>
    <label>流程ID：</label><input id="workflowmodprocinstid" v-model="flowdetailinfo.procinstid" type="text" disabled>
    <br><br>
    <label>员工号：</label><input id="workflowmodygh" v-model="flowdetailinfo.ygh" type="text">
    <br><br>
    <label>员工名称：</label><input id="workflowmodname" v-model="flowdetailinfo.name" type="text">
    <br><br>
    <label>备注：</label><input id="workflowmodbak" v-model="flowdetailinfo.bak" type="text">
    <div>
        <div class="dialogheader">CEO审批</div>
        <label>CEO意见：</label><input id="workflowceoyj" v-model="flowdetailinfo.ceoyj" v-bind:disabled="ygh!='02'">
    </div>
    <div>
    <div class="dialogheader">董事长审批</div>
    <label>董事长意见：</label><input id="workflowdszyj" v-model="flowdetailinfo.dszyj" v-bind:disabled="ygh!='01'">
    </div>
    <br>
        <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="workflowdialogmodsubmit(detailDialogVisible = false)">提交</el-button>
        <el-button type="info" @click="detailDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>
<!--待办事项页面-->
<div>
    <!--待办事项查询-->
    <div id="workflowset" class="workflowresultset">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>待办列表</el-breadcrumb-item>
        <el-breadcrumb-item>待办列表查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-button type="danger" v-if="['01','02'].includes(ygh)">不能发起流程</el-button>
            <el-button type="success" v-else @click="addDialogVisible = true">流程发起</el-button>
        </div>
        <div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      :current-page.sync="currentPage"
                      :stripe="stripe"
                      border style="width: 100%">
                <el-table-column prop="id_" label="ID_"></el-table-column>
                <el-table-column prop="proc_inst_id_" label="流程实例ID"></el-table-column>
                <el-table-column prop="name_" label="节点定义名称"></el-table-column>
                <el-table-column prop="assignee_" label="审批人"></el-table-column>
                <el-table-column prop="create_time_" label="创建时间"></el-table-column>
                <el-table-column label="详情">
                    <template slot-scope="{row,$index}">
                        <el-button size="small" @click="ContractDetail(row,$index,detailDialogVisible = true)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="{row,$index}">
                        <el-button size="small" @click="tongguo(row,$index)">通过</el-button>
                        <el-button size="small" @click="jujue(row,$index)">回退</el-button>
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
</div>
</div>
</template>

<script>
export default {
    data() {
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
            }
        },
        mounted:function(){
            this.workflowselect();
        },
        methods:{
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

            //流程发起功能
            workflowdialogaddsubmit:function(){
                var arr = this;
                var ygh = this.ygh;
                var name = this.username;
                var bak = this.bak;
                var data = {
                    ygh:ygh
                    ,name:name
                    ,bak:bak
                };
                axios.post('startProcess', data).then(function (response) {
                    arr.workflowselect();
                    return arr.$message.success('新的流程发起了！！！');
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            //待办列表查询
            workflowselect:function(){
                var arr = this;
                var data = {
                    zhiwu:this.zhiwu
                    }
                axios.post('workflowselect', data).then(function (response) {
                    arr.tableData = response.data;
                    arr.total = response.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            //流程详情
            ContractDetail:function (row,index) {
                var arr = this;
                var procinstid = row.proc_inst_id_;
                var data = {
                    procinstid : procinstid
                }
                axios.post('ContractDetailSelect', data).then(function (response) {
                    arr.flowdetailinfo=response.data[0];
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            //流程详情提交
            workflowdialogmodsubmit:function(){
                var arr = this;
                var data = this.flowdetailinfo;
                axios.post('workflowmodsubmit', data).then(function (response) {
                    return arr.$message.success('审批意见已提交！！！');
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            //审批通过
            tongguo:function (row,index) {
                var arr = this;
                var taskid = row.id_;
                var data = {
                    taskid : taskid
                }
                axios.post('Approvalsuccess', data).then(function (response) {
                    arr.workflowselect();
                    return arr.$message.success('流程审批通过了！！！');
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            //审批拒绝
            jujue:function (row,index) {
                var arr = this;
                var taskid = row.id_;
                var data = {
                    taskid : taskid
                }
                axios.post('Approvalfailed', data).then(function (response) {
                    arr.workflowselect();
                    return arr.$message.error('流程审批拒绝了！！！');
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        }
}
</script>

<style>
.dialogheader{
    background-color: #2aabd2;
    color: white;
    text-align: center;
}
</style>