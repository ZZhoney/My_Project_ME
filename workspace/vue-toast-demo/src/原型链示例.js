function Elem(id){
	 this.elem=document.getElementById(id)
}

Elem.prototype.html=function(val){
	var elem=this.elem
	if(val){
		elem.innerHTML=val
		return this//链式操作
	}else{
	   return elem.innerHTML
	}
}


Elem.prototype.on=function(type,fn){
	var elem=this.elem
	elem.addEventListener(type,fn)
	return this

	
}


var div1=new Elem('app')

div1.html('<p>呦呦</p>>').on('click',function(){
	alert('clicked')
})
// div1.html('<p>呦呦</p>>')
// div1.on('click',function(){alert('nihao')})
