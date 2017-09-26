/**
 * Created by dell on 2017/8/23.
 */
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var productSchema=new Schema({
  "productId":{type:String},
  "productName":{type:String},
  "productImg":{type:String},
  "salePrice":{type:Number},
  "productNum":Number,
  "checked":String
});


module.exports=mongoose.model('Good',productSchema);
