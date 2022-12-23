<template>
  <div id="account">
    <img  alt="user logo" src="../assets/user.png" width="100">
    <a @click="golastpage" class="goback">回上一頁</a>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <br>
    <div class="user_info">
      使用者: {{ user.name }}<br>
      信箱: {{ user.email }}<br>
    </div>

    <hr/>

    <div class="fav">
      <div class="fav_bar">
        <p class="fav_title"> 收藏景點 </p>
        <img class="refresh" src="../assets/reload.png" @click="getFav()"> 
      </div>
      
      <hr>
      <ul>
        <li v-for="(item) in fav_list" :key='item.a_id'>
          <div class="result_bar">
            <div class="InfoText2">
              <p> {{ item.a_name }} </p>
              <p> 縣市: {{ item.a_city }} 地址: {{ item.a_addr }}</p>
              <img class="fav_icon" src="../assets/favourite.png" v-if="!checkallFaved(item)" @click="changeFaved(item)"/>
              <img class="fav_icon" src="../assets/favourite-liked.png" v-if="checkallFaved(item)" @click="changeFaved(item)"/>
            </div>
          </div>
        </li>
        <li v-if="fav_none">
          尚無收藏
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default{
  props:{
    user:{
      type: Object,
    },
    input:{
      type: Object
    }
  },
  mounted(){
    console.log('current user:',this.user)
    if(this.user.user_fav !=''){
      console.log('checked user has faved')
      this.getFav()
    }
    
  },
  data(){
    return{
      fav_list: [],
      fav_none: true
    }
  },
  methods:{
    golastpage(){
      this.$router.push({ name: 'Main', params: { user: this.user, last_input:this.input }  })
    },
    getFav(){
      console.log('start get fav')
      
      axios.get('http://127.0.0.1/attr/get_fav',{
        params:{
          fav: this.user.user_fav
        }
      }).then(res=>{
        console.log('get fav:\n',res.data)
        this.fav_list = res.data
      })
      this.fav_none = false
    },
    checkallFaved(item){
      let f = this.user.user_fav.split(',')
      if (f.includes(item.a_id.toString())){
        // console.log('matched')
        return true
      }else{
        // console.log('not matched')
        return false
      }
    },
    changeFaved(item){
      // let matched = 0
      let fav = this.user.user_fav.split(',')
      console.log('id:', item.a_id.toString())
      console.log('user fav:', fav, fav.includes(item.a_id.toString()))
      
      let f_id = fav.indexOf(item.a_id.toString())
      console.log('f_id=', f_id)
      if(this.checkallFaved(item)){
        console.log('change to false, user_fav=',this.user.user_fav )
        fav.splice(f_id,1)
        console.log(fav.toString())
        this.user.user_fav = fav.toString()
        console.log('changed user_fav:',this.user.user_fav,'send update api' )
        this.updateFav()
        return false
      }else{
        console.log('change to true, user_fav=',this.user.user_fav)
        if(this.user.user_fav==''){
          this.user.user_fav += item.a_id
        }else{
          this.user.user_fav += ','+item.a_id
        }
        console.log('changed user_fav:',this.user.user_fav,'send update api' )
        this.updateFav()
        return true
      }
    },
    updateFav(){
      axios.get('http://127.0.0.1/user/updfav',{
        params:{
          fav: this.user.user_fav,
          id: this.user.id
        }
      }).then(res=>{
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
body{
  margin: 0px;
  padding: 0;
}
.goback{
  position: absolute;
  left: 5%;
  /* border: 1px solid; */
  width: 6%;
  height: 25px;
  border-radius: 10%;
  cursor: pointer;
  color: #FEF9FF;
  background-color: #5fa4cc;
}
#account{
  padding-top: 30px;
  background-color: #FFFAFF;
  min-height: 890px;
  height: auto;
}
.user_info{
  /* border: 1px solid; */
  margin-top: 10px;
  font-family:sans-serif;
  font-size: 20px;
  font-weight: lighter;
  color: rgb(49, 134, 184);
  line-height: 30px;
}
.fav{
  border: 1px solid;
  border-radius: 20px;
  margin-top: 20px;
  position: relative;
  left: 10%;
  width: 80%;
  min-height: 500px;
  height: auto;
  text-align: center;
}
.fav_bar{
  display: flex;
  justify-content: space-between;
}
.fav_title{
  /* border: 1px solid; */
  font-size: 30px;
  font-family: cursive;
  width: 80%;
  margin-left: 10%;
}
.refresh{
  /* border: 1px solid #000; */
  border-radius: 10px;
  background-color: #AFD2E9;
  /* height: 80px; */
  max-height: 50px;
  cursor: pointer;
  position: relative;
  /* right: -38%; */
  margin-top: 3%;
  margin-right: 3%;
}

.result_bar{
  border:2px rgb(7, 1, 4) solid;
  border-bottom-style: double;
  margin-right: 20px;
  width:auto;
  height: 100px;
  color: #000;
  border-radius:10px;
  display: flex;
  /* justify-content: space-around; */
  background-color: transparent;
  background: url(../assets/purple.png);
  transition: all .3s linear;
  cursor: auto;
}
.InfoText2{
  width: 100%;
  height: 100px;
  text-align: left;
  padding-left: 30px;
  /* cursor: pointer; */
  color: #000;
  background-color: transparent;
  background: url('');
  /* border: 1px solid #000; */
  position: relative;
  transition: all .3s linear;
  display: flex wrap;
  /* justify-content: start; */
}
.InfoText2 > p{
    position: relative;
    /* z-index: 1; */
}
.InfoText2::before{
    content: "";
    width: 0%;
    height: 100%;
    display: block;
    background-color: rgb(13, 122, 155);
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    transition: all .3s ease;
}
.InfoText2:hover{
    color: #fff;
}
.InfoText2:hover::before{
    width: 100%;
}
.fav_icon{
  position: absolute;
  top: 25px;
  right: 10px;
  z-index: 1;
  width: 50px;
  height: 50px;
  display: inline-flex;
  justify-content: center; 
  align-items: center; 
  cursor: pointer;
}
</style>
