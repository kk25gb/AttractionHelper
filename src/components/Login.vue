<template>
    <div id="LogIN">
      <div class="container">
        <!-- <a href="home.html"><img class="logo" src="../assets/logo.png"></a> -->
        <div class="title">
        <div :class="login==true?'login active':'login'" @click="change_state()">Log in</div>
        <div :class="signup==true?'register active':'register'" @click="change_state()">Sign up</div>
        </div>
      <form :class="login==true?'login-form active':'login-form'" v-show="login">
        <div>
            <div  class="input-group">
            <span class="icon icon-user-name"></span>
            <input class="input-user-name" type="text" v-model.trim="input_email" required placeholder="Email">
            <span class="icon icon-true"></span>
            </div>
            <div class="tip tip-user-name">
            <span class="icon icon-note"></span><span>account does not exist</span>
            </div>
        </div>
        
        <div>
            <div  class="input-group">
            <span class="icon icon-password"></span>
            <input class="input-password" type="password" v-model.trim="input_password" required placeholder="Password">
            <span class="icon icon-true"></span>
            </div>
            <div class="tip tip-user-name">
            <span class="icon icon-note"></span><span>Please check your email and password</span>
            </div>
        </div>
        
        <div class="input-group">
            <input class="input-remember" type="checkbox" name="remember-password" value="true">
            <span>Remember password</span>
            <span class="forget">Forgot?</span>
        </div>
        <div v-show="invalid_login" class="login_hint">帳號密碼錯誤</div>
        <button class="button-login" type="button" @click="submit_login">Log in</button>
      </form>

      <form :class="signup==true?'register-form active':'register-form'"  v-show="signup"> 
        <div>
            <div  class="input-group">
            <span class="icon icon-phone-number"></span>
            <input class="input-user-name" type="text" v-model.trim="input_email" name="user-name" required placeholder="Email">
            <span class="icon icon-true"></span>
            </div>
            <!-- <div class="tip tip-user-name">
            <span class="icon icon-note"></span><span>Registered!</span>
            </div> -->
        </div>
        <!-- <div>
            <div  class="input-group" style="display: none">
            <span class="icon icon-ver-code"></span>
            <input class="register-ver-code" type="text" name="register-ver-code" required placeholder="Verification code">
            <span class="icon icon-true"></span>
            <span class="ver-code">Verification code
            </span>
            </div>
            <div class="tip tip-user-name">
            <span class="icon icon-note"></span><span>
                Verification code error</span>
            </div>
        </div> -->
        <div>
            <div  class="input-group">
            <span class="icon icon-user-name"></span>
            <input class="register-user-name" type="text" v-model.trim="input_name" name="register-user-name" required placeholder="Name">
            <span class="icon icon-true"></span>
            </div>
            <div class="tip tip-user-name">
            <span class="icon icon-note"></span><span></span>
            </div>
        </div>
        <div>
            <div  class="input-group">
            <span class="icon icon-password"></span>
            <input class="register-password" type="password" v-model.trim="input_password" name="register-password" required placeholder="Password">
            <span class="icon icon-true"></span>
            </div>
            <div class="tip tip-user-name">
            <span class="icon icon-note"></span><span>error</span>
            </div>
        </div>
        <div v-show="invalid_reg" class="login_hint">輸入不完全</div>
        <button class="button-register" type="button" @click="submit_signup">Sign up</button>
      </form>
      </div>
        <!-- <div class="message-container">
            <div class="message">
                <div class="icon icon-true"></div>
                <div class="message-text">Sign up suceesfully
                </div>
                 <div class="message-text">关闭</div> 
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  data(){
    return{
      login: true,
      signup: false,
      
      input_name:'',
      input_email: '',
      input_password: '',

      invalid_login: false,
      invalid_reg: false,
      
      users:[],
      id: -1,
      
    }
  },
  mounted(){
    console.log('hi')
    axios.get('http://127.0.0.1/user/get').then(res=>{
        // console.log(res.data)
        this.users = res.data
        console.log('已註冊:',this.users)
      }).catch(err=>{
        console.log(err)
      })
  },
  methods:{
    change_state(){
      this.input_name=''
      this.input_email= ''
      this.input_password= ''
      if(this.login){
        this.login = false
        this.signup = true
      }
      else{
        this.login = true
        this.signup = false
      }
    },
    submit_login(){
      if(this.input_email=='' || this.input_password==''){
        this.invalid_login = true
      }else{
        this.invalid_login = false
      }

      // console.log('start check')
      // console.log('email:',this.input_email)
      // console.log('pass:',this.input_password)
      var em = this.input_email
      var pas = this.input_password
      var passed = true
      var u_id = -1
      passed = this.users.every(function(user){
          // console.log('check:', user)
          if(user.email == em.toString()){
            if(user.password == pas.toString()){
              u_id = user.id
              return false
            }
          }
          return true
      })
      this.id = u_id
      console.log('done check, passed=', passed, 'id=',this.id)
      console.log('user info:', this.users[this.id])
      if(!passed){
        this.invalid_login = false
        this.$router.push({ name: 'Main', params: { user: this.users[this.id], last_input:{i_type:0, i_loc:0, i_hrs:1, i_tranp:'汽車'} } }  )
      }else{
        this.invalid_login = true
      }
    },

    submit_signup(){
      console.log('email:',this.input_email)
      console.log('name:',this.input_name)
      console.log('pass:',this.input_password)
      if(this.input_email=='' || this.input_password=='' || this.input_name==''){
        this.invalid_reg = true
      }else{
        this.invalid_reg = false
      }
      
      axios.get('http://127.0.0.1/user/reg',{
        params:{
          id: this.users.length,
          name: this.input_name,
          email: this.input_email,
          password: this.input_password,
          user_fav: ''
        }
      }).then(res=>{
        console.log(res.data)
        this.invalid_reg = false
        this.$router.push({ name: 'Main', params: { user: {id: this.users.length, name: this.input_name, 
          email: this.input_email, password: this.input_password, user_fav: ''}, last_input:{i_type:0, i_loc:-1, i_hrs:1, i_tranp:'汽車'} }  })
      }).catch(err=>{
        console.log(err)
      })
      
    }
  }
}
</script>

<style scoped>
body{
  margin: 10px;
  padding: 0;
  display: block;
}
img{
  display: block;
}

button{
  cursor: pointer;
}

#LogIN{
  /* border: black solid; */
  min-height: 100vh;
  height: auto;
  background-image: url(../assets/bg3.png);
  background-size: cover;
}
.container{
  /* border: black solid; */
  width: 300px;
  margin: auto;
  transition: 1s;
}
.login-form, .register-form{
  background-color: rgba(0, 0, 0, .5);
}

.title div{
  margin-top: 150px;
  width: 50%;
  float: left;
  font-size: 16px;
  text-align: center;
  padding: 10px 0px;
  color: #ffffff;
  background-color: #333333;
  opacity: 0.5;
  cursor: pointer;
}
.title .active{
  opacity: 1;
  cursor: default;
}
.title::after{
  content: "";
  display: block;
  clear: both;
}
.logo{
  width: 100px;
  height: 100px;
  display: block;
  margin: 0px auto;
}

.container .input-group{
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 20px;
}
.input-group .icon{
  float: left;
  width: 40px;
  height: 40px;
  background-color: #333333;
  -webkit-background-size: 70% 70%;
  background-size: 70% 70%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.4;
}
.input-group .icon-user-name{
  background-image: url(../assets/用户名.png);
}
.input-group .icon-password{
  background-image: url(../assets/密码.png);
}
.input-group .icon-ver-code{
  background-image: url(../assets/验证码.png);
}
.input-group .icon-true{
  background-image: url(../assets/true.png);
  position: absolute;
  right: 0px;
  background-size: 50% 50%;
  background-color: rgba(0,0,0,0);
  display: none;
}
.tip{
  color: #ff5b5b;
  margin-top: 10px;
  transition: all 2s;
  font-size: 16px;
  display: none;
}
.tip * {
  /*visibility: hidden;*/
  /*display: none;*/
  transition: 2s;
}
.tip .icon{
  margin-right: 10px;
  float: left;
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  background-image: url(../assets/false.png);
}
.login_hint{
  color: #f58282;
  text-align: left;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
  margin: 0;
}
.input-group input{
  border: 0px;
  float: left;
  width: 236px;
  padding: 12px;
}
.input-group .input-remember{
  width: 15px;
  height: 100%;
}
.input-group span{
  color: #cccccc;
  line-height: 40px;
}
.input-group span.forget{
  float: right;
  cursor: pointer;
}
button{
  /*margin-top: 10px;*/
  color: #ffffff;
  width: 100%;
  height: 40px;
  border: 0px;
  background: #4cae4c;
}
.other{
  color: #cccccc;
  position: relative;
}
.other div{
  margin: 20px 0px;
  text-align: center;
}
.other ul{
  list-style: none;
  height: 40px;
}

.other ul li{
  /*float: left;*/
  position: absolute;
}
.other ul img{
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.other .left{
  left: 30px;
}
.other .right{
  right: 30px;
}
.other .center{
  left: 135px;
}
/*input{
  outline: 1px #ff5b5b solid;
}*/
.button-register{
  margin-top: 20px;
}
.input-group .ver-code{
  position: absolute;
  right: 0px;
  cursor: pointer;
  background: #4cae4c;
  color: #ffffff;
  /*box-sizing: border-box;*/
  padding:0px 10px;
}
form{
  display: none;
}
form.active{
  display: inline-block;
}
.message-container{
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, .5); 
  top: 0px;
  display: none;
}
.message-container .message{
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  margin: 200px auto;
  transition: 1s;
  background: rgb(256, 256, 256);
  padding-bottom: 40px;
}
.message div{
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #595959;
}
.message .icon{
  /*display: inline-block;*/
  width: 50px;
  height: 50px;
  margin: 20px auto;
  background: url(../assets/正确.png);
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;

}
</style>