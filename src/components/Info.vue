<template>
    
    <div id="info">
        <a @click="golastpage" class="goback">回上一頁</a>
        <p class="name">{{ attr.a_name }}</p>
        <hr>
        <div class="detail">
            <p> 縣市: {{ attr.a_city }}  &nbsp;&nbsp;&nbsp; 地址: {{ attr.a_address }}</p>
            <p>電話: {{ attr.a_tel }} &nbsp;&nbsp;&nbsp; 收費方式: {{ attr.a_ticket }}</p>
            <p>營業/開放時間: {{ attr.a_open }} </p>
        </div>
        <hr>
        <div class="des">
            <p>簡介</p>
            <p>{{ attr.a_intro }}</p>
        </div>
        <br>
        <br>
        <div class="pic">
            <img :src="attr.a_url" >
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    mounted(){
        console.log('Info,attrac info:', this.attr)
        console.log('Info,c_user:', this.c_user)
    },
    props:{
        attr:{
            type: Object,
        },
        c_user:{
            type: Object
        },
        input:{
            type: Object
        }
    },
    data(){
        return{            
            // user:[],
            // attr:{
            //     a_name: '木柵動物園',
            //     a_intro: 'intro',
            //     a_url: '',
            // }
        
        }
    },
    methods:{
        golastpage(){
            this.$router.push({ name: 'Main', params:{user:this.c_user, last_input:this.input}})
        }
    }
}

</script>

<style scoped>
img {  
    max-height: 100%;  
    max-width: 100%; 
    width: auto;
    height: auto;
    /* position: absolute;  
    top: 0;  
    bottom: 0;  
    left: 0;  
    right: 0;  
    margin: auto; */
}
#info{
    /* border: #333 solid 1px; */
    padding-top: 5%;
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
.des {
  width: 70%;
  margin-left: 15%;
  border: 1px solid #333;
  box-shadow: 3px 3px 5px #444;
  margin-top: 2%;
  /* background-image: linear-gradient(180deg, #fff, #ddd 40%, #ccc); */
  
}

.pic{
    /* border: #333 solid; */
    width: 70%;
    margin-left: 15%;
    height: auto;
    display: flex;
    justify-content: center;
}
</style>