var express= require("express");
var exe= require("./../connection");
var url = require("url");
var router=express.Router();

function verify_login(req,res,next)
{
  req.session.user_id=7;
if(req.session.user_id) 
  next();
else
res.send("<script>location.href = document.referrer +'?open_login_modal'</script>");
}



// function is_login(req)
// {
//   if(req.session.user_id)
//     return true;
//   else
//   return false;
// }

router.get("/", async function(req,res)
{
var cats= await exe(`SELECT * FROM category`);
var obj={"cats":cats};
res.render("user/home.ejs",obj);
});
// "is_login": is_login(req)


router.get("/product", async function(req,res)
{

 var cats= await exe(`SELECT * FROM category`);

 var url_Data=  url.parse(req.url,true).query;
 var cond ="";
 if(url_Data.product_type)
 {
 cond =  `WHERE  product_type ='${url_Data.product_type}'`;
 }

 if(url_Data.category_id)
  {
  cond = `WHERE product_category_id ='${url_Data.category_id}'`;
  }




 var sql=`SELECT * FROM product `+cond;
 var product = await exe(sql);

var obj={"cats":cats,"product":product};
res.render("user/product.ejs",obj);

});



router.get("/product_details/:product_id", async function(req,res)
{   var cats= await exe(`SELECT * FROM category`);  
  var product_info = await exe(`SELECT * FROM product,category,brand
    WHERE 
    product.product_category_id=category.category_id
    AND product.product_brand_id = brand.brand_id

   AND  product_id ='${req.params.product_id}'`); 
   
   var in_cart =await exe(`SELECT * FROM cart WHERE product_id='${req.params.
    product_id}'AND
     user_id='${req.session.user_id}'`)


    var obj={"cats":cats,"product_info":product_info[0],"in_cart":in_cart};
    res.render("user/product_details.ejs",obj);
});





router.post ("/save_in_cart", verify_login , async function(req,res)
{
  var user_id=req.session.user_id;
  var d= req.body;
  var sql=`INSERT INTO cart(user_id,product_id,size,quantity)VALUES (?,?,?,?)`;
  var data=await exe (sql,[user_id,d.product_id,d.size,d.quantity]);
  // res.send(data);
  res.send("<script> location.href= document.referrer</script>");
});

//CREATE TABLE cart(card_id INT PRIMARY KEY AUTO_INCREMENT,
// user_id INT,product_id INT,size VARCHAR(10),quantity INT)



router.post ("/save_account", async function(req,res)
{
  // res.send(req.body);
  var d = req.body;
  var sql=`INSERT INTO user_accounts(user_name,mobile,email,password) VALUES (?,?,?,?)`;
  var data= await exe (sql,[d.user_name,d.mobile,d.email,d.password]);
  // res.send(data);
  res.send("<script> location.href= document.referrer</script>");
});



router.post("/procced_login",async function (req,res) {
  // res.send(req.body);

  var d=req.body;
  var sql=`SELECT * FROM user_accounts WHERE email=? AND password=?`;
  var data= await exe(sql,[d.email,d.password]);
  if(data.length >0)
  {
    var user_id = data[0].user_id;
    req.session.user_id = user_id;
    // res.send("Login Success");

    res.send(`
    <script>
     var url=document.referrer;
     var new_url = url.replaceAll('?open_login_modal','');
     location.href= new_url;
     </script>
     `);
  }
  else

  res.send("Login Failed");

});

router.get("/cart",verify_login, async function(req,res){

  var sql=`SELECT * FROM cart,product,user_accounts
  WHERE
  cart.user_id =user_accounts.user_id
  AND cart.product_id=product.product_id
  AND cart.user_id ='${req.session.user_id}'`;
  var products = await exe(sql);
 var cats = await exe(`SELECT * FROM category`);  
 var obj = {"cats":cats, "products":products};
res.render("user/cart.ejs",obj);

});


router.get("/delete_from_cart/:cart_id",verify_login,async function (req,res) {
  var id = req.params.cart_id;
  var user_id = req.session.user_id;
  var sql=`DELETE  FROM cart WHERE cart_id ='${id}' AND user_id = '${user_id}'`;
  var data = await exe(sql);
  // res.send(data);
  res.redirect("/cart");

});


router.post("/update_cart_qty", async function(req,res){
  var d=req.body;
  var sql=`UPDATE cart SET quantity ='${d.new_qty}'WHERE
cart_id='${d.cart_id}'`;
var data= await exe(sql);
var sql2=`SELECT SUM(product.product_price*cart.quantity )as all_total
FROM cart,product,user_accounts
 WHERE
 cart.user_id = user_accounts.user_id
 AND cart.product_id =product.product_id
 AND cart.user_id ='${req.session.user_id }'`;  
 var data2 = await exe(sql2);
res.send(data2[0]);

});


router.get("/checkout",verify_login , async function(req,res){
var cats= await exe(`SELECT * FROM category`);

var sql=`SELECT SUM(product.product_price * cart.quantity )as total
FROM product,cart WHERE
  cart.product_id =product.product_id
 AND cart.user_id ='${req.session.user_id }'`;  
var data= await exe(sql);


var obj={"cats":cats,"total":data[0]['total']};
res.render("user/checkout.ejs",obj);
});


router.post("/confirm_order",verify_login , async function(req,res){
  var user_id = req.session.user_id;
  
 var sql= (`SELECT * FROM cart,product WHERE cart.product_id=product.product_id AND user_id='${user_id}'`)
  var product= await exe(sql);
  var d=req.body;

 d.order_date = new Date().toISOString().slice(0,10);
 d.payment_status ='pending';
 d.transaction_id='';
 d.user_id=user_id;

 var sql2=`SELECT SUM(product.product_price * cart.quantity )as total
FROM product,cart WHERE
  cart.product_id =product.product_id
 AND cart.user_id ='${req.session.user_id }'`;  
 var ttl= await exe(sql2);
 d.total=ttl[0].total;



var sql3=`INSERT INTO order_info(user_id, full_name ,mobile_no,street_landmark ,city ,district,
  state, country,pincode ,payment_mode ,order_date,payment_status ,transaction_id ,total ,order_status
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

 var data = await exe(sql3,[user_id,d.full_name, d.mobile_no,d.street_landmark, d.city ,d.district,
  d.state, d.country,d.pincode ,d.payment_mode ,d.order_date,d.payment_status ,d.transaction_id ,d.total,'pending']);
  var order_id = data.insertId;
  //products
  product.map( async(row)=>{


  prod=[];
  prod[0]=user_id;
  prod[1]=order_id ;
  prod[2]= row.product_id;
  prod[3]= row.quantity;
  prod[4]= row.product_price;
  prod[5]= row.product_price * row.quantity;
  var sql4=`INSERT INTO order_products(user_id,order_id,product_id,quantity,price,total)VALUES (?,?,?,?,?,?)`;



  var data= await exe(sql4,prod);

})

await exe(`DELETE FROM cart WHERE user_id='${user_id}'`);

if(req.body.payment_mode == 'online')
{
  res.redirect("/do_payment/"+order_id);

}
else
{
  res.redirect("/my_orders");
}

 // res.send(req.body);

});


router.get("/do_payment/:order_id",async function (req,res) 
{
  var order_id= req.params.order_id;
  var order_info= await exe(`SELECT * FROM order_info WHERE order_id ='${order_id}'
    `);
    var obj={"order_info":order_info[0]};
  res.render("user/do_payment.ejs",obj);
});




router.post("/payment_success/:order_id", verify_login , async function(req,res){
  var order_id=req.params.order_id;
  var sql =`UPDATE order_info SET  payment_status ='Paid',
  transaction_id ='${req.body.razorpay_payment_id}' WHERE 
  order_id='${order_id}'`;
  var data=await exe (sql);
  // res.send(data);
  res.redirect("/my_orders");
});



router.get("/my_orders", verify_login,async function (req,res) 
{

var sql=`SELECT * FROM order_info WHERE user_id= '${req.session.user_id}'`;
var cats = await exe(`SELECT * FROM category`);  
var data= await exe(sql);
var obj={"orders":data,"cats":cats};
res.render("user/my_orders.ejs",obj);

});
module.exports=router;


// CREATE TABLE user_accounts
// (user_id INT PRIMARY KEY AUTO_INCREMENT,
// user_name VARCHAR(100),
// mobile VARCHAR(15),
//   email VARCHAR(100),
//   password VARCHAR(100)
// ))


// CREATE TABLE order_info (order_id INT PRIMARY KEY AUTO_INCREMENT ,user_id INT,
//   full_name VARCHAR(100),mobile_no VARCHAR (20),street_landmark Text, city VARCHAR(100),district VARCHAR(100),
//   state VARCHAR(100), country VARCHAR(100),pincode VARCHAR(10),payment_mode VARCHAR(20),
//   order_date VARCHAR(20),payment_status VARCHAR(20),transaction_id VARCHAR(20),total INT,order_status VARCHAR(20))






// CREATE TABLE order_products(order_product_id INT PRIMARY KEY AUTO_INCREMENT,user_id INT ,order_id INT,product_id INT, quantity INT, price INT ,total INT)