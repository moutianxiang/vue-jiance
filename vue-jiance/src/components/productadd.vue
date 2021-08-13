<template>
<!--产品信息页面-->
<el-form :model="productaddinfo" ref="productaddinfo">
    <!--产品新增对话框-->
    <div id="productDialogAddDiv" class="adddialog">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>业务信息</el-breadcrumb-item>
        <el-breadcrumb-item>业务信息新增</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <label>客户ID：</label><input id="addproductcid" type="text" v-model="productaddinfo.custid">
        <label>客户名称：</label><input id="addproductcname" type="text" v-model="productaddinfo.custname">
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
        <br><br>
        <el-button type="success" @click="productdialogaddsubmit()">保存</el-button>
        <el-button type="info" @click="productdialogaddclose()">重置</el-button>
    </div>
</el-form>
</template>

<script>
export default {
    data() {
        return {
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
                }
            }
        },
        methods:{
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
            productdialogaddclose:function () {
                this.productaddinfo = this.$options.data().productaddinfo;
            },
        }
}
</script>

<style>

</style>