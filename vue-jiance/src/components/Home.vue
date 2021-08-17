<template>
  <el-container>
    <el-header>
        <div class="sysname">
        <div style="float: left">
            <el-image :src="require('@/assets/logo.jpg')" alt='深圳市中方检测有限公司'></el-image>
        </div>
        <div style="float: left">深圳市中方检测有限公司</div>
        </div>
        <div class="headerright">
            <span>中方检测欢迎您,<a id="uname" class="user">{{ username }}</a></span>
            &nbsp;
            <span>工号：<a id="ygh" class="user">{{ ygh }}</a></span>
            &nbsp;&nbsp;
            <span id="info">{{ nowDate }}</span>
            &nbsp;&nbsp;
            <el-button type="warning" @click="quit()">退出</el-button>
        </div>
    </el-header>
    <el-container>
      <el-aside width="20%">
          <el-menu
                        class="el-menu-vertical-demo"
                       :unique-opened="true"
                       router
                        >
                   <el-menu-item index="/shouye">
                      <i class="el-icon-menu"></i>
                      <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1" v-if="['01','02'].includes(ygh)">
                       <template slot="title">
                           <i class="el-icon-setting"></i>
                           <span>员工列表</span>
                       </template>
                           <el-menu-item index="/personselect">员工信息查询</el-menu-item>
                           <el-menu-item index="/personadd">员工信息新增</el-menu-item>
                   </el-submenu>
                   <el-submenu index="2">
                       <template slot="title">
                           <i class="el-icon-message-solid"></i>
                           <span>任务列表</span>
                       </template>
                           <el-menu-item index="/workflowselect">待办列表查询</el-menu-item>
                           <el-menu-item v-show="ygh!=='02'&&ygh!=='01'" index="/taskselect">所有任务查询</el-menu-item>
                   </el-submenu>
                   <el-submenu index="3">
                       <template slot="title">
                           <i class="el-icon-user"></i>
                           <span>个人信息</span>
                       </template>
                       <el-menu-item index="/userselect">个人信息查询</el-menu-item>
                   </el-submenu>
                   <el-submenu index="4">
                       <template slot="title">
                           <i class="el-icon-s-custom"></i>
                           <span>客户信息</span>
                       </template>
                       <el-menu-item index="/custselect">客户信息查询</el-menu-item>
                       <el-menu-item index="/custadd">客户信息新增</el-menu-item>
                   </el-submenu>
                   <el-submenu index="5">
                       <template slot="title">
                           <i class="el-icon-document"></i>
                           <span>业务信息</span>
                       </template>
                       <el-menu-item index="/productselect">业务信息查询</el-menu-item>
                       <!-- <el-menu-item index="/productadd">业务信息新增</el-menu-item> -->
                   </el-submenu>
               </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      ygh: sessionStorage.getItem('ygh'),
      username: sessionStorage.getItem('username'),
      nowDate: ''
    }
  },
  mounted () {
    this.currentTime()
  },
  methods: {
    currentTime () {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
    },
    //退出功能
    quit:function(){
      sessionStorage.removeItem("ygh")
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("zhiwu")
      this.$router.push('/login')
    },
  },
}
</script>

<style>
.adddialog label{
    display:inline-block;
    width: 100px;
}

.moddialog label{
    display:inline-block;
    width: 100px;
}

.beizhuwidth{
    width: 600px;
}

input{/*内边距和边距不再会增加它的宽度*/
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 250px;
}

.el-select{
  width:250px
}

.user{
    color: greenyellow;
    font-weight: bold;
    font-size: 20px;
}

.sysname{
    vertical-align: middle;
    margin-top: 10px;
    float: left;
}

.headerright{
    margin-top: 10px;
    float: right;
}

.el-header, .el-footer {
    background-color: #2992DA;
    color: #fff;
    text-align: center;
    line-height: 35px;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
