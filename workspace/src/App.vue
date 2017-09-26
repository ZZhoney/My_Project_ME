<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
 mounted() {this.getdata();},
  methods:{
    getdata(){
      axios.get('/',{

      }).then(function(response){
        alert(response.data.msg);


      })




    }
  }
}

</script>

<style>
  .left{
    width:20%;
    border: 1px solid gray;
    float: left;
  }
</style>
