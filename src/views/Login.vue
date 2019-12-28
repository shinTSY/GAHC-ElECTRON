<template>
  <el-container style="height: 100%;">
    <el-header class="header">
      <div class="logo">
        <img :src="require('../assets/giada.png')" alt />
      </div>
      <div class="slogen">Connecting everything for a better digital future</div>
    </el-header>
    <el-main class="main">
      <h2>JAHC高可靠无人值守系统</h2>
      <div class="login-card">
        <div class="left">
          <div class="name">杰和科技企业级服务</div>
          <div class="description">
            JAHC是杰和科技实现高可靠无人值守
            系统的一个解决方案，旨在为客户
            提供长期不监管情况下机器能
            正常运行的环境保障。
          </div>
        </div>
        <div class="right">
          <h2>欢迎登录</h2>
          <el-form :model="ruleForm" status-icon class="login-form" size="small">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                placeholder="密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="ruleForm.language" placeholder="语言">
                <template slot="prefix">
                  <img class="language-icon" v-if="ruleForm.language==='zh-cn'" :src="require('@/assets/login_cn.png')" alt="">
                  <img class="language-icon" v-else :src="require('@/assets/login_eng.png')" alt="">
                </template>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="login-button" type="primary" @click="Login">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer class="footer">版权所有 1999-2018 深圳市杰和科技发展有限公司.保留一切权利. 粤ICP备09010736号</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      options: [
        { label: '英文', value: 'english' },
        { label: '中文', value: 'zh-cn' }
      ],
      ruleForm: {
        password: '',
        username: '',
        language: 'zh-cn'
      }
    }
  },
  methods: {
    Login() {
      this.$router.push('/main')
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  height 60px
  background rgba(59, 111, 230, 1)
  line-height 60px
  color #fff
  .logo
    float left
    margin 8px 0 8px 226px
    img
      width 147px
      height 46px
  .slogen
    float right
    margin-right 226px
    font-size 16px
    font-style italic
    font-family Arial
    font-weight bold
.main
  margin 0 auto
  h2
    margin-top 69px
    color #3B6FE6
    font-size 30px
    text-align center
  .login-card
    width 678px
    height 380px
    background rgba(255, 255, 255, 1)
    box-shadow 0px 2px 4px rgba(0, 0, 0, 0.06)
    opacity 1
    margin-top 32px
    border-radius 4px
    overflow hidden
    .right
      float right
      width 368px
      height 100%
      text-align center
      h2
        font-size 30px
        color rgba(0, 0, 0, 0.65)
        margin-top 32px
      .login-form
        margin-top 24px
        .language-icon
          vertical-align middle
          width 16px
          height 13px
        .login-button
          width 288px
        .el-input, .el-select
          width 288px
          height 36px
          line-height 36px
          padding-left 0
          /deep/ .el-input__inner
            height 36px
            line-height 36px
            padding-left 0
            border-radius 0
            border-width 0 0 1px 0
        .el-select
          /deep/ .el-input__inner
            padding-left 30px
    .left
      width 310px
      float left
      background-image url('~@/assets/login_card_left.png')
      height 100%
      color white
      text-align center
      .name
        margin 42px 50px 0
      .description
        width 230px
        height 104px
        text-align center
        font-size 12px
        margin 50px auto 0
.footer
  width 100%
  text-align center
  height 19px
  font-size 14px
  font-weight 400
  line-height 17px
  color rgba(0, 0, 0, 0.45)
</style>
