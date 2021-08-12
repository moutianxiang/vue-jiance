<template>
  <div class="loginStyle">
    <el-form :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">中方检测</h3>
      <el-form-item prop="ygh">
        <el-input
          size="normal"
          type="text"
          v-model="loginForm.ygh"
          auto-complete="off"
          placeholder="请输入员工号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="normal"
          type="password"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        ygh: '02',
        password: '123456'
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
.loginStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/login.jpg');
  background-size: 100% 100%;
  height: 100%;
  background-size: cover;
}
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
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
