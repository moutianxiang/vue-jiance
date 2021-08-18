<template>
    <el-form :model="custaddinfo" ref="custaddinfo">
    <!--客户新增对话框-->
    <div id="custDialogAddDiv" class="adddialog">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>客户信息</el-breadcrumb-item>
        <el-breadcrumb-item>客户信息新增</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <label>客户名称：</label>
        <input id="custcnameadd" type="text" v-model="custaddinfo.custname" list="custlist" autocomplete="off">
        <datalist id="custlist"></datalist>
        <label>部门：</label><input id="custdepadd" type="text" v-model="custaddinfo.depname">
        <br><br>
        <label>角色：</label><input id="custjueseadd" type="text" v-model="custaddinfo.custlevel">
        <label>电话：</label><input id="custdianhuaadd" type="text" v-model="custaddinfo.gdphone">
        <br><br>
        <label>手机：</label><input id="custshoujiadd" type="text" v-model="custaddinfo.phonenum">
        <label>邮箱：</label><input id="custyouxiangadd" type="text" v-model="custaddinfo.email">
        <br><br>
        <!-- <label>客户分类：</label><input id="custclassadd" type="text" v-model="custaddinfo.custclass"> -->
        <label>客户分类：</label>
        <el-select id="custclassadd" type="text" v-model="custaddinfo.custclass">
            <el-option
            v-for="item in custclasss"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <label>录入时间：</label><input id="custcreatetimeadd" type="text" v-model="custaddinfo.createtime">
        <br><br>
        <label>传真：</label><input id="custchuanzhenadd" type="text" v-model="custaddinfo.chuanzhen">
        <label>公司名称：</label><input id="custcompanyadd" type="text" v-model="custaddinfo.company">
        <br><br>
        <label>备注：</label><input id="custbeizhuadd" class="beizhuwidth" type="text" v-model="custaddinfo.beizhu">
        <br><br>
        <br><br>
        <el-button type="success" @click="custdialogaddsubmit()">保存</el-button>
        <el-button type="info" @click="custdialogaddclose('custaddinfo')">重置</el-button>
    </div>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            custaddinfo:{
                custname:""
                ,depname:""
                ,custlevel:""
                ,gdphone:""
                ,phonenum:""
                ,email:""
                ,chuanzhen:""
                ,company:""
                ,beizhu:""
                ,ygh: sessionStorage.getItem('ygh')
            },
            custclasss:[
                {
                value: '意向客户',
                label: '意向客户'
                }, {
                value: '成交客户',
                label: '成交客户'
                }
            ]
        }
    },
    mounted:function(){
            this.querycustList();
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //客户新增页面的客户名称提示框
            querycustList:function(){
                var arr = this;
                var data = {};
                axios.post('getyycust', data).then(function (response) {
                    var cust_add_options;
                        for (var i = 0; i < response.data.length; i++) {
                            var op=document.createElement("option");
                            op.setAttribute("value",response.data[i].custname); 
                             document.getElementById('custlist').appendChild(op);
                        }
                })
                .catch(function (error) {
                    
                });
            },

            //提交客户新增信息
            custdialogaddsubmit:function () {
                var arr = this;
                axios.post('custadd', this.custaddinfo).then(function (response) {
                    arr.custaddinfo = arr.$options.data().custaddinfo;
                    return arr.$message.success('客户信息新增成功了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('客户信息新增失败了！！！');
                });
            },
            //重置客户新增信息
            custdialogaddclose:function (formName) {
                this.custaddinfo = this.$options.data().custaddinfo;
            }
        }
}
</script>

<style>

</style>