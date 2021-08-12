<template>
<div id="custmod" class="moddialog">
<!--客户修改对话框-->
<el-dialog title="编辑客户信息"
           :visible.sync="modDialogVisible"
           :data="custinfo"
           width="800px"
           center>
        <input id="custmodcustid" v-model="custinfo.custid" type="text" style="display: none">
        <br><br>
        <label>客户名称：</label><input id="custmodcustname" v-model="custinfo.custname" type="text">
        <label>部门：</label><input id="custmoddepname" v-model="custinfo.depname" type="text">
        <br><br>
        <label>公司名称：</label><input id="custmodcompany" v-model="custinfo.company" type="text">
        <label>角色：</label><input id="custmodcustlevel" v-model="custinfo.custlevel" type="text">
        <br><br>
        <label>电话：</label><input id="custmodgdphone" v-model="custinfo.gdphone" type="text">
        <label>手机：</label><input id="custmodphonenum" v-model="custinfo.phonenum" type="text">
        <br><br>
        <label>邮箱：</label><input id="custmodemail" v-model="custinfo.email" type="text">
        <label>传真：</label><input id="custmodchuanzhen" v-model="custinfo.chuanzhen" type="text">
        <br><br>
        <label>备注：</label><input id="custmodbeizhu" class="beizhuwidth" v-model="custinfo.beizhu" type="text">
        <br><br>
        <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="custdialogmodsubmit(modDialogVisible = false)">保存</el-button>
        <el-button type="info" @click="modDialogVisible = false">取消</el-button>
        </span>
</el-dialog>
<!--客户信息页面-->
<div>
    <!--客户查询页面-->
    <div id="custresultset" class="custresultset">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>客户信息</el-breadcrumb-item>
        <el-breadcrumb-item>客户信息查询</el-breadcrumb-item>
        </el-breadcrumb>
        <input type="text" id="custname" v-model="sscustname" placeholder="客户名称模糊查询">
        <el-button type="primary" @click="custselect()">查询</el-button>
        <br>
        <el-divider></el-divider>
        <template>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :current-page.sync="currentPage"
                  :stripe="stripe"
                  :default-sort = "{prop: 'custid', order: 'descending'}"
                  border style="width: 100%">
            <el-table-column prop="custid" label="客户ID" sortable></el-table-column>
            <el-table-column prop="custname" label="客户名称" sortable></el-table-column>
            <el-table-column prop="depname" label="部门" sortable></el-table-column>
            <el-table-column prop="company" label="公司名称" sortable></el-table-column>
            <el-table-column prop="custlevel" label="角色"></el-table-column>
            <el-table-column prop="gdphone" label="电话"></el-table-column>
            <el-table-column prop="phonenum" label="手机"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="chuanzhen" label="传真"></el-table-column>
            <el-table-column prop="beizhu" label="备注"></el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="{row,$index}">
                    <el-button size="small" @click="custmodify(row,$index,modDialogVisible = true)">编辑</el-button>
                    <el-button size="small" @click="custdel(row,$index)">删除</el-button>
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
        </template>
    </div>
</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            stripe:true,//是否为斑马纹 table
            sscustname:"",
            custinfo:[],
            tableData:[],
            modDialogVisible: false,
            currentPage:1,
            pagesize:6,
            total:0,
            }
        },
        mounted:function(){
            this.custselect();
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

            //客户信息提交修改
            custdialogmodsubmit:function (){
                var arr = this;
                axios.post('custmod', this.custinfo).then(function (response) {
                    arr.custselect();
                    return arr.$message.success('客户信息修改成功了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('客户信息修改失败了！！！');
                });
            },
            //客户信息查询
            custselect:function () {
                var arr = this;
                var data = {
                    custname: this.sscustname
                    ,ygh : sessionStorage.getItem('ygh')
                }
                axios.post('custselect', data).then(function (response) {
                    arr.tableData = response.data;
                    arr.total = response.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            //客户信息修改对话框
            custmodify:function(row,index){
                    //浅拷贝
                    Object.assign(this.custinfo,row);
            },
            //客户信息删除
            custdel:function (row,index) {
                var arr = this;
                this.$confirm('此操作将永久删除该客户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    var custid = row.custid;
                    var data = {
                        custid:custid
                    };
                    axios.post('custdel', data).then(function (response) {
                    arr.custselect();
                    arr.$message.success('删除成功!');
                    })
                    }).catch(() => {
                    arr.$message.info('已取消删除');          
                    });
            },
        }
}
</script>

<style>

</style>