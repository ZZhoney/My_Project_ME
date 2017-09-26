function Foo(name){
	this={}
	this.name=name
}
var f=new Foo('zhangsan')

var obj={
	name='A',
	printName:function(){
		console.log(this.name)
	}
}

