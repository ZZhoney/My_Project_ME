/**
 * Created by dell on 2017/8/27.
 */
var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
  /*定义字段*/
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "productImg":String,
      "salePrice":Number,
      "checked":String,
       "productNum":Number
    },
  ],

  "addressList":[
    {
      "addressId" : String,
      "userName" : String,
      "streetName" : String,
      "postCode" : String,
      "tel" : String,
      "isDefault" : Boolean
    }
  ]

});
module.exports=mongoose.model("User",userSchema);
