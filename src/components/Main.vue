<template>
<!-- <KeepAlive> -->
<div>
  <div id="navbar">
    <div class="travel_condition">
      <p class="input_describtion">遊玩類型</p>
      <select v-model="type">
        <option disabled value="">請選擇</option>
        <option value="1">歷史文化</option>
        <option value="2">宗教之旅</option>
        <option value="3">特色街區</option>
        <option value="4">城市公園</option>
        <option value="5">自然風光</option>
        <option value="6">天冷泡湯</option>
        <option value="7">文青必去</option>
        <option value="8">休閒生活</option>
        <option value="9">健康樂活</option>
        <option value="10">其他</option>
      </select>
    </div>
    <div class="travel_condition">
      <p class="input_describtion">出發位置</p>
      <select v-model="loc">
        <option disabled value="">請選擇</option>
        <option value="0">基隆市</option>
        <option value="1">臺北市</option>
        <option value="2">新北市</option>
        <option value="3">桃園市</option>
        <option value="4">新竹市</option>
        <option value="5">新竹縣</option>
        <option value="6">苗栗縣</option>
        <option value="7">臺中市</option>
        <option value="8">彰化縣</option>
        <option value="9">南投縣</option>
        <option value="10">雲林縣</option>
        <option value="11">嘉義縣</option>
        <option value="12">嘉義市</option>
        <option value="13">臺南市</option>
        <option value="14">高雄市</option>
        <option value="15">屏東縣</option>
        <option value="16">宜蘭縣</option>
        <option value="17">花蓮縣</option>
        <option value="18">臺東縣</option>
      </select>
    </div>
    <div class="travel_condition">
      <p class="input_describtion">景點之間通勤時間</p>
      <input v-model.trim="hrs"  placeholder="不小於1" class="input_time">
    </div>
    <div class="travel_condition">
      <p class="input_describtion">交通方式</p>
      <select v-model="transpo">
        <option disabled value="">請選擇</option>
        <option>汽車</option>
      </select>
    </div>
    <input class="submit-button" type="submit" @click="submit_req" value="Submit">
    <router-link :to="{name:'Account', params:{user: this.user, input:{i_type:type, i_loc:loc, i_hrs:hrs, i_tranp:'汽車'} } }" class="account">
      <img src="../assets/user.png" alt="頭貼" width="45" height="45" >
    </router-link>
  </div>

  <div id="attractions">
    <div class="popular">
      <p class="title">政府推薦、熱門選擇</p>
      <ul>
        <li v-for="(item) in p_list" :key='item.a_id'>
          <div class="result_bar" >
            <div class="InfoText2">
              <router-link class="wrap" :to="{name:'Info', params:{attr:item, c_user:user, input:{i_type:type, i_loc:loc, i_hrs:hrs, i_tranp:'汽車'} } }">
                <p> {{ item.a_name }} </p>
                <p> 縣市: {{ item.a_city }} 地址: {{ item.a_addr }}</p>
              </router-link>
              <img class="fav_icon" src="../assets/favourite.png" v-if="!checkallFaved(item)" @click="changeFaved(item)"/>
              <img class="fav_icon" src="../assets/favourite-liked.png" v-if="checkallFaved(item)" @click="changeFaved(item)"/>
            </div>
          </div>
        </li>
        <li v-if="p_none">
          尚無查詢結果
        </li>
      </ul>
    </div>
    <div class="secret">
      <p class="title">私房小眾</p>
      <ul>
        <li v-for="(item) in np_list" :key='item.a_id'>
          <div class="result_bar" >
            <div class="InfoText2">
              <router-link class="wrap" :to="{name:'Info', params:{attr:item, c_user:user, input:{i_type:type, i_loc:loc, i_hrs:hrs, i_tranp:'汽車'} } }">
                <p> {{ item.a_name }} </p>
                <p> 縣市: {{ item.a_city }} 地址: {{ item.a_addr }}</p>
              </router-link>
              <img class="fav_icon" src="../assets/favourite.png" v-if="!checkallFaved(item)" @click="changeFaved(item)"/>
              <img class="fav_icon" src="../assets/favourite-liked.png" v-if="checkallFaved(item)" @click="changeFaved(item)"/>
            </div>
          </div>
        </li>
        <li v-if="np_none">
          尚無查詢結果
        </li>
      </ul>
    </div>
  
  </div>
</div>
<!-- </KeepAlive> -->
  
  
</template>
  
<script>
import axios from 'axios'

export default {
  name: 'Main',
  components: {
    
  },
  props:{
    user:{
      type: Object,
    },
    last_input:{
      type: Object
    }
  },mounted(){
    console.log('current user:',this.user)
    console.log('last input:', this.last_input)
    this.submit_req()
  },
  data(){
    return{
      type: this.last_input.i_type,
      loc: this.last_input.i_loc,
      hrs: this.last_input.i_hrs,
      transpo:this.last_input.i_tranp,
      dest: [],
      p_list:[],
      p_none: true,
      np_list:[],
      np_none: true,

      city_list: ['基隆市', '臺北市',	'新北市',	'桃園市',	'新竹市',	'新竹縣',	'苗栗縣',	'臺中市',	'彰化縣',	'南投縣', '雲林縣',	'嘉義縣',	
      '嘉義市',	'臺南市',	'高雄市',	'屏東縣',	'宜蘭縣',	'花蓮縣',	'臺東縣'],

      trans_list: [[0, 0,	0,	1,	1,	1,	1,	2,	2,	2,	2,	3,	3,	3,	4,	4,	1,	3,	6],[0,	0,	0,	0,	1,	1,	1,	2,	2,	2,	2,	3,	3,	3,	4,	4,	1,	3,	6],
      [0,	0,	0,	0,	1,	1,	1,	2,	2,	2,	2,	3,	3,	3,	3,	4,	1,	3,	6],[1,	0,	0, 0,	1,	1,	1,	1,	1,	2,	2,	2,	2,	3,	3,	4,	1,	3,	6],
      [1,	1,	1,	1,	0,	0,	1,	1,	1,	2,	2,	2,	2,	2,	3,	3,	2,	4,	5],[1,	1,	1, 1,	0,	0,	1,	1,	1,	2,	2,	2,	2,	2,	3,	3,	2,	4,	5],
      [1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	1,	2,	3,	3,	2,	4,	5],[2,	2,	2,	1,	1,	1,	1,	0,	0,	1,	1,	1,	1,	2,	2,	2,	2,	4,	5],
      [2,	2,	2,	1,	1,	1,	1,	0,	0,	1,	1,	1,	1,	1,	2,	2,	2,	4,	4],[2,	2,	2,	2,	2,	2,	1,	1,	1,	0,	1,	1,	1,	2,	2, 2,	3,	4,	5],
      [2,	2,	2,	2,	2,	2,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	3,	5,	4],[3,	3,	3,	2,	2,	2,	1,	1,	1,	1,	0,	0,	0,	1,	1,	1,	3,	5,	4],
      [3,	3,	3,	2,	2,	2,	1,	1,	1,	1,	0,	0,	0,	1, 1,	1,	3,	5,	4,], [3,	3,	3,	3,	2,	2,	2,	2,	1,	2,	1,	1,	1,	0,	1,	1,	4,	6,	3],
      [4,	4,	3,	3,	3,	3,	3,	2,	2,	2,	1,	1,	1,	1,	0,	0,	4,	6,	3],[4,	4,	4,	4,	3,	3,	3,	2,	2,	2,	1,	1,	1,	1,	0,	0,	4,	5,	2],
      [1,	1,	1,	1,	2,	2,	2,	2,	2,	3,	3,	3,	3,	4,	4,	4,	0,	2,	5],[3,	3,	3,	3,	4,	4,	4,	4,	4,	4,	5,	5,	5,	6,	6,	5,	2,	0,	3],
      [6,	6,	6,	6,	5,	5,	5,	5,	4,	5,	4,	4,	4,	3,	3,	2,	5,	3,	0]]
    }
  },
  
  methods:{
    submit_req(){
      console.log('type:',this.type,'city:',this.loc,'hrs:',this.hrs,'transp:',this.transpo)
      this.p_list,this.np_list,this.dest = [],[],[]
      let ct = this.hrs-1 
      let timel = this.trans_list[this.loc]
      for (let i = 0; i < timel.length; i++){
        if (timel[i] <= ct){
          this.dest.push(this.city_list[i])
        }
      }
      axios.get('http://127.0.0.1/attr/submit_req',{
        params:{
          a_type: this.type,
          a_city: this.dest,
        }
      }).then(res=>{
        console.log(res.data)
        // console.log(res.data[0].length)
        // console.log(res.data[1].length)
        // check if no attractions
        if(res.data[0].length > 0){
          this.p_none = false
        }
        
        if(res.data[1].length > 0){
          this.np_none = false
        }
        // get the attractions
        this.p_list = res.data[0]
        this.np_list = res.data[1]
        // console.log(typeof this.p_list[0], this.p_list[0])
      }).catch(err=>{
        console.log(err)
      })
      
    },
    checkallFaved(item){
      let f = this.user.user_fav.split(',')
      // console.log('start check', f)
      if (f.includes(item.a_id.toString())){
        // console.log('matched')
        return true
      }else{
        // console.log('not matched')
        return false
      }
    },
    changeFaved(item){
      let f = this.user.user_fav.split(',')
      console.log('id:', item.a_id.toString())
      // console.log('f:', f, f.includes(item.a_id.toString()))
      
      let f_id = f.indexOf(item.a_id.toString())
      // console.log('f_id=', f_id)
      if(this.checkallFaved(item)){
        console.log('change to false, user_fav=',this.user.user_fav )
        f.splice(f_id,1)
        // console.log(f.toString())
        this.user.user_fav = f.toString()
        console.log('changed user_fav:',this.user.user_fav,'send update api' )
        this.updateFav()
        // return false
      }else{
        console.log('change to true, user_fav=',this.user.user_fav)
        if(this.user.user_fav==''){
          this.user.user_fav += item.a_id
        }else{
          this.user.user_fav += ','+item.a_id
        }
        console.log('changed user_fav:',this.user.user_fav,'send update api' )
        this.updateFav()
        // return true
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
  
<style >
body{
  margin:0px;
  padding:0px;
}
ul li{
  list-style-type: none;
  margin:0px;
  padding: 0;
}
a {
  text-decoration:none;
}
a.wrap {
  color: black;
}

#navbar{
  box-sizing: border-box;
  background-color: rgb(70, 207, 200);
  display: flex;
  flex-direction: row;
  justify-content:start;
  position: relative;
  top: 0px;
  padding: 5px;
  height: 100px;
  width: 100%;
  padding-left: 30px;
  border-bottom: solid 2px #93827F;
  /* border: #000 solid; */
}
.travel_condition{
  margin-left: 20px; 
}
.input_time{
  width: 60px;
}
.submit-button{
  height: 30px;
  width: 60px;
  margin-left: 30px;
  margin-top: 45px;
}
.account{
  width: 60px;
  height: 60px;
  position: absolute;
  right: 10%;
  margin-top: 15px;
  border: solid 1px black;
  border-radius: 99em; 
  display: inline-flex;
  justify-content: center; 
  align-items: center; 
  padding-bottom: 1px;
  padding-right: 1px;
}

#attractions{
  display: flex;
  justify-content: center; 
  background-color: #FEF9FF;
  height: auto;
}
.popular{
  /*border: solid 1px black;*/
  border-right: solid 2px #93827F;
  min-height: 100vh; 
  height:auto;
  width: 49%;
  padding: 0;
}
.result_bar{
  cursor: auto;
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
}
.wrap{
  /* border: 1px solid #000; */
  width: 88%;
  position: relative;
  cursor: pointer;
}
.InfoText2{
  width: 100%;
  height: 100px;
  text-align: left;
  padding-left: 30px;
  color: #000;
  background-color: transparent;
  background: url('');
  /* border: 1px solid #000; */
  position: relative;
  transition: all .3s linear;
  display: flex wrap;
  /* justify-content: start; */
}
/* .InfoText2 > p{
    position: relative;
    z-index: 1;
} */
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
/* .InfoText{
  width: 780px;
  height: 100px;
  text-align: left;
  cursor: pointer;
  color: #000;
  padding-left: 20px;
  border: 1px solid #000;
}
.InfoText::before:hover{
  width: 100%;
} */

.attrac_des{
  /* border: black solid 2px; */
  color: #7C5869;
  background-color: #AFD2E9;
  border-radius: 5px;
  padding-top: 3px;
  padding-left: 4px;
  padding-bottom: 3px;
  cursor: pointer;
  width: 45%;
  height: 45%;
  overflow: hidden;
  position: relative;
  top: -60%;
  left: 40%;
}
.attrac_des:hover{
  background-color: #9DC5BB;
  color: #DEE5E5;
}

.secret{
  /*border: solid 1px yellow;*/
  min-height: 100vh; 
  height: auto;
  width: 51%;
}
.title{
  font-size: 23px;
  margin-left: 15px;

}
.res_bar{
  border: solid 2px #93827F;
  padding: 2px;
  height: 80px;
  display: flex;
}

</style>
  