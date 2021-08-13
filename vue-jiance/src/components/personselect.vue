<template>
<div id="personmod" class="moddialog">
<!--员工修改对话框-->
    <el-dialog title="编辑员工信息"
               :visible.sync="modDialogVisible"
               :data="personinfo"
               width="800px"
               center>
        <label>员工号：</label><input id="personygh" type="text" v-model="personinfo.ygh">
        <label>用户名：</label><input id="personusername" type="text" v-model="personinfo.username">
        <br><br>
        <label>部门：</label><input id="persondepartment" type="text" v-model="personinfo.department">
        <label>职务：</label><input id="personzhiwu" type="text" v-model="personinfo.zhiwu">
        <br><br>
        <label>固定电话：</label><input id="persongdphone" type="text" v-model="personinfo.gdphone">
        <label>手机：</label><input id="personphonenum" type="text" v-model="personinfo.phonenum">
        <br><br>
        <label>个人账号：</label><input id="personaccount" type="text" v-model="personinfo.account">
        <label>开户银行：</label><input id="personopenbank" type="text" v-model="personinfo.openbank">
        <br><br>
        <label>公司账号：</label><input id="personcompanyaccount" type="text" v-model="personinfo.companyaccount">
        <label>公司开户行：</label><input id="personcompanyopenbank" type="text" v-model="personinfo.companyopenbank">
        <br><br>
        <label>公司名：</label><input id="personcompany" type="text" v-model="personinfo.company">
        <label>邮箱：</label><input id="personemail" type="text" v-model="personinfo.email">
        <br><br>
        <label>备注：</label><input id="personbeizhu" type="text" v-model="personinfo.beizhu">
        <label>密码：</label><input id="personpasswd" type="text" v-model="personinfo.passwd">
        <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="personmoddialogsubmit(modDialogVisible = false)">保存</el-button>
        <el-button type="info" @click="modDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>
<!--员工信息页面-->
<div id="personinfo">
    <!--员工查询页面-->
    <div id="personset" class="personresultset">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>员工列表</el-breadcrumb-item>
        <el-breadcrumb-item>员工信息查询</el-breadcrumb-item>
        </el-breadcrumb>
        <input type="text" id="username" v-model="ssusername" placeholder="员工名称模糊查询">
        <el-button type="primary" @click="personselect()">查询</el-button>
        <br>
        <el-divider></el-divider>
        <template>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      :current-page.sync="currentPage"
                      :stripe="stripe"
                      :default-sort = "{prop: 'ygh', order: 'descending'}"
                      border style="width: 100%">
                <el-table-column prop="ygh" label="员工号" width="90px" v-if="showColumn.ygh" sortable></el-table-column>
                <el-table-column prop="username" label="用户名" v-if="showColumn.username" sortable></el-table-column>
                <el-table-column prop="department" label="部门" v-if="showColumn.department" sortable></el-table-column>
                <el-table-column prop="zhiwu" label="职务" v-if="showColumn.zhiwu"></el-table-column>
                <el-table-column prop="gdphone" label="固定电话" v-if="showColumn.gdphone"></el-table-column>
                <el-table-column prop="phonenum" label="联系方式" v-if="showColumn.phonenum"></el-table-column>
                <el-table-column prop="account" label="个人账号" v-if="showColumn.account"></el-table-column>
                <el-table-column prop="openbank" label="开户银行" v-if="showColumn.openbank"></el-table-column>
                <el-table-column prop="companyaccount" label="公司账号" v-if="showColumn.companyaccount"></el-table-column>
                <el-table-column prop="companyopenbank" label="公司开户行" v-if="showColumn.companyopenbank"></el-table-column>
                <el-table-column prop="company" label="公司名" v-if="showColumn.company"></el-table-column>
                <el-table-column prop="email" label="邮箱" v-if="showColumn.email"></el-table-column>
                <el-table-column prop="beizhu" label="备注" v-if="showColumn.beizhu"></el-table-column>
                <el-table-column prop="passwd" label="密码" v-if="showColumn.passwd"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150px">
                    <template slot-scope="{row,$index}">
                        <el-button size="small" @click="personmodify(row,$index,modDialogVisible = true)">编辑</el-button>
                        <el-button size="small" @click="persondel(row,$index)">删除</el-button>
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
            personinfo:{},
            tableData:[],
            ssusername:"",
            modDialogVisible: false,
            currentPage:1,
            pagesize:6,
            total:0,
            //展示的列信息
            showColumn:{
                 ygh               : true
                ,username          : true
                ,passwd            : false
                ,department        : true
                ,email             : true
                ,zhiwu             : true
                ,gdphone           : false
                ,phonenum          : true
                ,account           : false
                ,openbank          : false
                ,company           : false
                ,companyaccount    : false
                ,companyopenbank   : false
                ,beizhu            : false
            },
            }
        },
        mounted:function(){
            this.personselect();
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

            //员工信息查询
            personselect:function(){
                var arr = this;
                var data = {
                    username: this.ssusername
                }
                axios.post('personselect', data).then(function (response) {
                    arr.tableData = response.data;
                    arr.total = response.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            //员工信息提交修改
            personmoddialogsubmit:function (){
                 var arr = this;
                axios.post('personmod', arr.personinfo).then(function (response) {
                    arr.personselect();
                    return arr.$message.success('员工信息修改成功了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('员工信息修改失败了！！！');
                });
            },
            //员工信息修改对话框
            personmodify:function(row,index){
                //浅拷贝
                Object.assign(this.personinfo,row);
            },
            //员工信息删除
            persondel:function (row,index) {
                var arr = this;
                this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    var ygh = row.ygh;
                    var data = {
                        ygh:ygh
                    };
                    axios.post('persondel', data).then(function (response) {
                    arr.personselect();
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