import ToastComponent from './vue-toast.vue'
let Toast={};
Toast.install=function(Vue,options){
  var opt={
    durationL3000
  }
  for(var key in options){
    opt[key]=options[key];
  }
  Vue.prototype.$toast=function(message,option){
    if(typeof option=='object'){
      for(var key in option){
        opt[key]=options[key];
      }
    }
      //1.通过Vue.extend继承
      const  ToastController=Vue.extend(ToastComponent);//通过extend方法，Vue继承ToastComponent组件产生一个新组件
    //2.new一个实例，把实例挂载到div里
      var instance=new ToastController().$mount(document.createElement("div"))//挂载到div中，$mount和el:'#app'一样设置监听的范围

    instance.message=message;
      instance.visible=true;

      document.body.appendChild(instance.$el);
      
      setTimeout(()=>{
          instance.visible=false;
          document.body.removeChild(instance.$el);
      },3000)
    Vue.prototype.$toast['show']=function(message,option){
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['succes']=function(message,option){
      Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['info']=function(message,option){
      Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast['error']=function(message,option){
      Vue.prototype.$toast(message,option);
    }
  }
};
if(windows.Vue){
  Vue.use(Toast);
}
export default Toast;
