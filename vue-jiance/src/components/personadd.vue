<template>
<el-form :model="personlist" ref="personaddinfo">
  <!--个人信息查询-->
    <div id="userDialogSelectDiv" class="adddialog">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>员工列表</el-breadcrumb-item>
        <el-breadcrumb-item>员工信息新增</el-breadcrumb-item>
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
        <label>密码：</label><input id="personpasswd" type="text" v-model="personlist.passwd">
        <br><br>
        <el-button type="success" @click="persondialogselectsubmit()">保存</el-button>
        <el-button type="info" @click="persondialogselectclear()">重置</el-button>
    </div>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      personlist:{
         ygh               : ""
        ,username          : ""
        ,passwd            : ""
        ,department        : ""
        ,email             : ""
        ,zhiwu             : ""
        ,gdphone           : ""
        ,phonenum          : ""
        ,account           : ""
        ,openbank          : ""
        ,company           : ""
        ,companyaccount    : ""
        ,companyopenbank   : ""
        ,beizhu            : ""
      },
    }
  },
  methods: {
    //用户信息提交新增
            persondialogselectsubmit (){
                var arr = this;
                axios.post('personinsert', this.personlist).then(function (response) {
                    arr.personlist = arr.$options.data().personlist;
                    return arr.$message.success('用户信息新增成功了！！！');
                })
                .catch(function (error) {
                    return arr.$message.error('用户信息新增失败了！！！');
                });
            },
            //用户信息重置
            persondialogselectclear(){
                this.personlist = this.$options.data().personlist;
            },
  }
}
</script>

<style>
</style>