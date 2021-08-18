<template>
<div id="productmod" class="moddialog">
<!--产品修改对话框-->
    <el-dialog title="编辑业务信息"
               :visible.sync="modDialogVisible"
               :data="productinfo"
               width="800px"
               center>
        <input id="modproductid" type="text" v-model="productinfo.productid" style="display: none">
        <label>客户ID：</label><input id="modproductcustid" v-model="productinfo.custid" type="text">
        <label>客户名称：</label><input id="modproductcustname" v-model="productinfo.custname" type="text">
        <br><br>
        <label>产品型号：</label><input id="modproductno" v-model="productinfo.productno" type="text">
        <label>产品类别：</label><input id="modproductclass" v-model="productinfo.productclass" type="text">
        <br><br>
        <label>服务项目：</label><input id="modserviceitem" v-model="productinfo.serviceitem" type="text">
        <label>测试标准：</label><input id="modrefstandard" v-model="productinfo.refstandard" type="text">
        <br><br>
        <label>费用(RMB)：</label><input id="modcost" v-model="productinfo.cost" type="text">
        <label>样品数量(PCS)：</label><input id="modsampleqty" v-model="productinfo.sampleqty" type="text">
        <br><br>
        <label>周期(工作日)：</label><input id="modleadtime" v-model="productinfo.leadtime" type="text">
        <label>税金：</label><input id="modtotal" v-model="productinfo.total" type="text">
        <br><br>
        <label>交易金额：</label><input id="modtotal2" v-model="productinfo.total2" type="text">
        <label>备注：</label><input id="modbak" v-model="productinfo.bak" type="text">
        <br><br>
        <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="productmoddialogsubmit(modDialogVisible = false)">保存</el-button>
        <el-button type="info" @click="modDialogVisible = false">取消</el-button>
        </span>
    </el-dialog>
<!--产品信息页面-->
<div id="productinfo">
    <!--产品查询页面-->
    <div id="productset" class="productresultset">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>业务信息</el-breadcrumb-item>
        <el-breadcrumb-item>业务信息查询</el-breadcrumb-item>
        </el-breadcrumb>
        <input type="text" id="prodcustname" v-model="prodcustname" placeholder="客户名称模糊查询">
        <el-button type="primary" icon="el-icon-search" @click="productselect()">查询</el-button>
        <br>
        <el-divider></el-divider>
        <template>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      :current-page.sync="currentPage"
                      :stripe="stripe"
                      :default-sort = "{prop: 'productid', order: 'descending'}"
                      border style="width: 100%">
                <el-table-column prop="productid" label="业务编号" sortable></el-table-column>
                <el-table-column prop="custid" label="客户ID" sortable></el-table-column>
                <el-table-column prop="custname" label="客户姓名" sortable></el-table-column>
                <el-table-column prop="productno" label="产品型号"></el-table-column>
                <el-table-column prop="productclass" label="产品类别"></el-table-column>
                <el-table-column prop="serviceitem" label="服务项目"></el-table-column>
                <el-table-column prop="refstandard" label="测试标准"></el-table-column>
                <el-table-column prop="cost" label="费用(RMB)"></el-table-column>
                <el-table-column prop="sampleqty" label="样品数量(PCS)"></el-table-column>
                <el-table-column prop="leadtime" label="周期(工作日)"></el-table-column>
                <el-table-column prop="total" label="税金"></el-table-column>
                <el-table-column prop="total2" label="交易金额"></el-table-column>
                <el-table-column prop="bak" label="备注"></el-table-column>
                <el-table-column fixed="right" label="操作" width="200px">
                    <template slot-scope="{row,$index}">
                        <el-button size="mini" icon="el-icon-edit" @click="productmodify(row,$index,modDialogVisible = true)">编辑</el-button>
                        <el-button size="mini" icon="el-icon-delete" @click="productdel(row,$index)">删除</el-button>
                        <el-button size="mini" icon="el-icon-upload2" @click="doPublicContract(row,$index)">生成公账合同</el-button>
                        <el-button size="mini" icon="el-icon-upload2" @click="doPrivateContract(row,$index)">生成私账合同</el-button>
                        <el-link :href="'http://60.205.186.238:8880'+'/download/'+row.productid" :underline="false">
                        <el-button size="mini" icon="el-icon-download">下载合同</el-button>
                        </el-link>
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
            productinfo:[],
            tableData:[],
            prodcustname:"",
            modDialogVisible: false,
            currentPage:1,
            pagesize:6,
            total:0,
            }
        },
        mounted(){
            this.productselect();
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

            //产品信息查询
            productselect(){
                var arr = this;
                var data = {
                    prodcustname: this.prodcustname
                    ,ygh : sessionStorage.getItem('ygh')
                }
                axios.post('productselect', data).then(function (response) {
                    arr.tableData = response.data;
                    arr.total = response.data.length;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            //产品信息提交修改
            productmoddialogsubmit (){
                 var arr = this;
                axios.post('productmod', this.productinfo).then(function (response) {
                    arr.productselect();
                    return arr.$message.success('产品信息修改成功了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('产品信息修改失败了！！！');
                });
            },
            //产品信息修改对话框
            productmodify(row,index){
                //浅拷贝
                Object.assign(this.productinfo,row);
            },
            //产品信息删除
            productdel (row,index) {
                var arr = this;
                this.$confirm('此操作将永久删除该产品信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    var productid = row.productid;
                    var data = {
                        productid:productid
                    };
                    axios.post('productdel', data).then(function (response) {
                    arr.productselect();
                    arr.$message.success('删除成功!');
                    })
                    }).catch(() => {
                    arr.$message.info('已取消删除');          
                    });
            },
            //生成公账合同
            doPublicContract (row,index) {
                var arr = this;
                var data = row;
                data["ygh"] = sessionStorage.getItem('ygh');
                axios.post('doPublicContract', data).then(function (response) {
                    return arr.$message.success('公账合同已经生成了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('公账合同生成失败了！！！');
                });
            },
            //生成私账合同
            doPrivateContract (row,index) {
                var arr = this;
                var data = row;
                data["ygh"] = sessionStorage.getItem('ygh');
                axios.post('doPrivateContract', data).then(function (response) {
                    return arr.$message.success('私账合同已经生成了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('私账合同生成失败了！！！');
                });
            },
            //合同下载
            // download(row,index){
            //     var url = '/download/'+row.productid;
            //     axios.get(url).then(function (response) { 
            //     })
            //     .catch(function (error) { 
            //     });
            // },
        }
}
</script>

<style>

</style>