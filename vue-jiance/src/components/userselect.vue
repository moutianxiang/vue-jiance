<template>
<!--个人信息页面-->
<div id="personinfo">
    <!--个人信息查询-->
    <div id="userDialogSelectDiv" class="adddialog">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息查询</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <label>员工号：</label><input id="personygh" type="text" v-model="personlist.ygh">
        <label>用户名：</label><input id="personusername" type="text" v-model="personlist.username">
        <br><br>
        <label>部门：</label><input id="persondepartment" type="text" v-model="personlist.department">
        <label>职务：</label><input id="personzhiwu" type="text" v-model="personlist.zhiwu">
        <br><br>
        <label>固定电话：</label><input id="persongdphone" type="text" v-model="personlist.gdphone">
        <label>手机：</label><input id="personphonenum" type="text" v-model="personlist.phonenum">
        <br><br>
        <label>个人账号：</label><input id="personaccount" type="text" v-model="personlist.account">
        <label>开户银行：</label><input id="personopenbank" type="text" v-model="personlist.openbank">
        <br><br>
        <label>公司账号：</label><input id="personcompanyaccount" type="text" v-model="personlist.companyaccount">
        <label>公司开户行：</label><input id="personcompanyopenbank" type="text" v-model="personlist.companyopenbank">
        <br><br>
        <label>公司名：</label><input id="personcompany" type="text" v-model="personlist.company">
        <label>邮箱：</label><input id="personemail" type="text" v-model="personlist.email">
        <br><br>
        <label>备注：</label><input id="personbeizhu" type="text" v-model="personlist.beizhu">
        <el-button type="warning">密码重置</el-button>
        <input id="personpasswd" type="password" v-model="personlist.passwd">
        <br><br>
        <el-button type="success" @click="persondialogselectsubmit()">保存</el-button>
    </div>
</div>
</template>

<script>
export default {
        data() {
        return {
               personlist:{},
               userinfo: {
                ygh: sessionStorage.getItem('ygh'),
                username: sessionStorage.getItem('username')
               }
            }
        },
        mounted:function (){
            this.personselect()
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //用户信息查询
             personselect:function(){
                 var arr = this;
                axios.post('userselect', this.userinfo).then(function (response) {
                    arr.personlist = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            //用户信息提交修改
            persondialogselectsubmit:function (){
                var arr = this;
                axios.post('personmod', this.personlist).then(function (response) {
                    return arr.$message.success('用户信息修改成功了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('用户信息修改失败了！！！');
                });
            },
            
        }
}
</script>

<style>

</style>