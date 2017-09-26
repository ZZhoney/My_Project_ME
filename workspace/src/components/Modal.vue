<template>
  <div>
      <!--模态框-->
      <div class="md-modal modal-msg modal-msg  md-modal-transition  "  v-bind:class="{'md-show':mdShow}">//md-show
        <div class="md-modal-inner">
          <div class="md-top">
            <button class="md-close" @click="closeModal">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
                  <slot name="message"></slot><!--插入一个槽-->
            </div>
            <div class="btn-wrap">
                <slot  name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<script>

  export default{
    props:["mdShow"],
    data(){
      return{
             msg:'hello vue'
      }
    },
    methods:{
           closeModal(){
             this.$emit("close");

           }
    }

  }
</script>
