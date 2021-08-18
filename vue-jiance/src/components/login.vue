<template>
  <div class="loginStyle">
    <el-form :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">深圳中方检测公司</h3>
      <el-form-item prop="ygh">
        <el-input
          size="normal"
          type="text"
          prefix-icon="el-icon-user"
          v-model="loginForm.ygh"
          auto-complete="off"
          placeholder="请输入员工号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="normal"
          type="password"
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-button
        size="normal"
        type="primary"
        style="width: 100%;"
        @click="submitLogin()"
        >登录</el-button
      >
    </el-form>
    <el-footer>
      版权所有 &copy; 深圳中方检测公司
  </el-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        ygh: '',
        password: ''
      }
    }
  },
  methods: {
    async submitLogin () {
      const res = await this.$http.post('login', this.loginForm)
      console.log(res)
      if (res.data.passwd !== this.loginForm.password) {
        return this.$message.error('用户名或密码错误！！！')
      }
      sessionStorage.setItem('ygh', this.loginForm.ygh)
      sessionStorage.setItem('username', res.data.username)
      sessionStorage.setItem('zhiwu', res.data.zhiwu)
      this.$router.push('/home')
    }
  }
}
</script>

<style>
.el-footer {
    color: #fff;
    text-align: center;
  }

.loginStyle {
  display: inline-block;
  align-items: center;
  background-image: url('../assets/login.jpg');
  width: 100%;
  background-size: cover;
  overflow: auto !important;
}
.loginContainer {
  border-radius: 15px;
  margin: 10.7% auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>
