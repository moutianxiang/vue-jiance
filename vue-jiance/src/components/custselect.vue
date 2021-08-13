<template>
<div id="custmod" class="moddialog">
<!--业务信息新增对话框-->
<el-dialog title="业务新增信息"
           :visible.sync="productaddDialogVisible"
           :data="productaddinfo"
           @close="productdialogaddclose"
           width="800px"
           center>
           <label>客户ID：</label><input id="addproductcid" type="text" v-model="productaddinfo.custid" disabled>
        <label>客户名称：</label><input id="addproductcname" type="text" v-model="productaddinfo.custname" disabled>
        <br><br>
        <label>产品型号：</label><input id="addproductno" type="text" v-model="productaddinfo.productno">
        <label>产品类别：</label><input id="addproductclass" type="text" v-model="productaddinfo.productclass">
        <br><br>
        <label>服务项目：</label><input id="addserviceitem" type="text" v-model="productaddinfo.serviceitem">
        <label>测试标准：</label><input id="addrefstandard" type="text" v-model="productaddinfo.refstandard">
        <br><br>
        <label>费用(RMB)：</label><input id="addcost" type="text" v-model="productaddinfo.cost">
        <label>样品数量(PCS)：</label><input id="addsampleqty" type="text" v-model="productaddinfo.sampleqty">
        <br><br>
        <label>周期(工作日)：</label><input id="addleadtime" type="text" v-model="productaddinfo.leadtime">
        <label>税金：</label><input id="addtotal" type="text" v-model="productaddinfo.total">
        <br><br>
        <label>备注：</label><input id="addbak" type="text" v-model="productaddinfo.bak">
        <label>交易金额：</label><input id="addtotal2" type="text" v-model="productaddinfo.total2">
        <br>
        <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="productdialogaddsubmit(productaddDialogVisible = false)">保存</el-button>
        <el-button type="warning" @click="productdialogaddclear()">重置</el-button>
        <el-button type="info" @click="productdialogaddclose(productaddDialogVisible = false)">取消</el-button>
        </span>
</el-dialog>
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
        <el-divider></el-divider>
        <template>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :current-page.sync="currentPage"
                  :stripe="stripe"
                  :default-sort = "{prop: 'custid', order: 'descending'}"
                  border style="width: 100%">
            <el-table-column prop="custid" label="客户ID" width="100px" v-if="showColumn.custid" sortable></el-table-column>
            <el-table-column prop="custname" label="客户名称" v-if="showColumn.custname" sortable></el-table-column>
            <el-table-column prop="depname" label="部门" v-if="showColumn.depname" sortable></el-table-column>
            <el-table-column prop="company" label="公司名称" v-if="showColumn.company" sortable></el-table-column>
            <el-table-column prop="custlevel" label="角色" v-if="showColumn.custlevel"></el-table-column>
            <el-table-column prop="gdphone" label="电话" v-if="showColumn.gdphone"></el-table-column>
            <el-table-column prop="phonenum" label="联系方式" v-if="showColumn.phonenum"></el-table-column>
            <el-table-column prop="email" label="邮箱" v-if="showColumn.email"></el-table-column>
            <el-table-column prop="chuanzhen" label="传真"  v-if="showColumn.chuanzhen"></el-table-column>
            <el-table-column prop="beizhu" label="备注" v-if="showColumn.beizhu"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="{row,$index}">
                    <el-button size="small" @click="productadd(row,$index,productaddDialogVisible = true)">业务新增</el-button>
                    <el-button size="small" @click="custmodify(row,$index,modDialogVisible = true)">客户编辑</el-button>
                    <el-button size="small" @click="custdel(row,$index)">客户删除</el-button>
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
            productaddDialogVisible:false,
            modDialogVisible: false,
            currentPage:1,
            pagesize:6,
            total:0,
            //展示的列信息
            showColumn:{
                 custid:true
                ,custname:true
                ,depname:false
                ,company:true
                ,custlevel:false
                ,gdphone:false
                ,phonenum:true
                ,email:false
                ,chuanzhen:false
                ,beizhu:false
            },
            //新增产品信息
            productaddinfo:{
                    custid:""
                    ,custname:""
                    ,productno:""
                    ,productclass:""
                    ,serviceitem:""
                    ,refstandard:""
                    ,cost:""
                    ,sampleqty:""
                    ,leadtime:""
                    ,total:""
                    ,bak:""
                    ,total2:""
                    ,ygh: sessionStorage.getItem('ygh')
                },
            custid:"",
            custname:"",
            ygh:sessionStorage.getItem('ygh')
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
            //业务新增信息
            productadd:function(row,index){
                this.productaddinfo.custid=row.custid;
                this.productaddinfo.custname=row.custname;
                this.custid = row.custid;
                this.custname = row.custname;
            },
            //提交产品新增信息
            productdialogaddsubmit:function () {
                var arr = this;
                axios.post('productadd', this.productaddinfo).then(function (response) {
                    arr.productaddinfo = arr.$options.data().productaddinfo;
                    return arr.$message.success('业务信息新增成功了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('业务信息新增失败了！！！');
                });
            },
            //重置产品新增信息
            productdialogaddclear:function () {
                this.productaddinfo = this.$options.data().productaddinfo;
                this.productaddinfo.custid = this.custid;
                this.productaddinfo.custname = this.custname;
                this.productaddinfo.ygh = this.ygh;
            },
            //关闭产品新增信息
            productdialogaddclose:function () {
                this.productaddinfo = this.$options.data().productaddinfo;
            },
        }
}
</script>

<style>

</style>