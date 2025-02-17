var express =require("express");
var exe = require("./../connection");
var router = express.Router();

router.get("/",async function(req,res){

  var pending_orders = await exe(`SELECT COUNT (*) as ttl FROM order_info WHERE order_status ='pending'`);

  var pending_order_paid_amount = await exe(`SELECT SUM (total) as ttl FROM order_info WHERE order_status ='pending'AND payment_status='paid'`);

  var pending_order_unpaid_amount = await exe(`SELECT SUM (total) as ttl FROM order_info WHERE order_status ='pending'AND payment_status='pending'`);


var xValues =[];
var yValues =[];
var Ctime = new Date ().getTime();
for (var i=0;i<7;i++)
{
 var newtime = Ctime-(86400*1000)*i
 var newdate = new Date(newtime).toISOString().slice(0,10);
 xValues.push(newdate);

 var amount = await exe(`SELECT SUM (total) as ttl FROM order_info WHERE order_date ='${newdate}'`);
 yValues.push(amount[0].ttl);

}

var obj=
{
  "pending_orders":pending_orders[0],
  "pending_order_paid_amount":pending_order_paid_amount[0],
  "pending_order_unpaid_amount":pending_order_unpaid_amount[0],
  "xValues":xValues,
  "yValues":yValues
};



res.render("admin/home.ejs",obj);
});





router.get("/add_category",function(req,res)
 {
res.render("admin/add_category.ejs",);
 });

    
router.post("/save_category", async function(req,res)
    {
 try{
 var d= req.body;
  d.category_name=d.category_name.replaceAll("'","\\'");
  d.category_details=d.category_details.replaceAll("'","\\'");
var sql=`INSERT INTO category(category_name,category_details)VALUES('${d.category_name}','${d.category_details}')`;
    var data= await exe(sql);
    // res.send(data);

    res.redirect("/admin/add_category");
   }catch(err){
    res.send("Invalid Data");
   }
   });
    router.get("/category_list", async function(req,res){
    var cats= await exe (`SELECT * FROM  category`);
    var obj={"cats":cats};
    res.render("admin/category_list.ejs",obj);      
    });
   

 
    router.get("/delete_category/:id", async function(req, res) {
      try {
          const categoryId = req.params.id;
          const sql = `DELETE FROM category WHERE category_id = ?`;
          await exe(sql, [categoryId]);
          res.redirect("/admin/category_list");
      } catch (err) {
          console.error("Error deleting category:", err);
          res.status(500).send("Error deleting category");
      }
  });
  router.get("/edit_category/:id", async function(req, res) {
    try {
        const categoryId = req.params.id;
        const sql = `SELECT * FROM category WHERE category_id = ?`;
        const category = await exe(sql, [categoryId]);

        if (category.length > 0) {
            res.render("admin/edit_category.ejs", { category: category[0] });
        } else {
            res.status(404).send("Category not found");
        }
    } catch (err) {
        console.error("Error fetching category:", err);
        res.status(500).send("Error fetching category details");
    }
});
router.post("/update_category/:id", async function(req, res) {
  try {
      const categoryId = req.params.id;
      let { category_name, category_details } = req.body;

      // Escape single quotes
      category_name = category_name.replaceAll("'", "\\'");
      category_details = category_details.replaceAll("'", "\\'");

      const sql = `
          UPDATE category 
          SET category_name = ?, category_details = ? 
          WHERE category_id = ?`;

      await exe(sql, [category_name, category_details, categoryId]);
      res.redirect("/admin/category_list");
  } catch (err) {
      console.error("Error updating category:", err);
      res.status(500).send("Error updating category");
  }
});



// brand
   router.get("/add_brand",function(req,res)
    { 
    res.render("admin/add_brand.ejs");
    });
    router.post("/save_brand", async function(req,res)
    {
    brand_image="";
    if(req.files)
    {

    if(req.files.brand_image)
    {
      brand_image=new Date().getTime()+req.files.brand_image.name;
      req.files.brand_image.mv("public/uploads/"+brand_image);
    }
    }
    var d =req.body;
    var sql=`INSERT INTO brand(brand_name,brand_image,brand_details) VALUES  (?,?,?)`;
    var data=await exe(sql,[d.brand_name,brand_image,d.brand_details]);
    // res.send(data);
    res.redirect("/admin/add_brand");
    });
    router.get("/brand_list", async function(req,res){
    var brand= await exe (`SELECT * FROM  brand`);
    var obj={"brand":brand};
    res.render("admin/brand_list.ejs",obj);      
    });


    router.get("/delete_brand/:id", async function(req, res) {
      try {
          const brandId = req.params.id;
          const sql = `DELETE FROM brand WHERE brand_id = ?`;
          await exe(sql, [brandId]);
          res.redirect("/admin/brand_list");
      } catch (error) {
          console.error("Error deleting brand:", error);
          res.status(500).send("Error deleting brand");
      }
  });
  router.get("/edit_brand/:id", async function(req, res) {
    try {
        const brandId = req.params.id;
        const sql = `SELECT * FROM brand WHERE brand_id = ?`;
        const brand = await exe(sql, [brandId]);

        if (brand.length > 0) {
            res.render("admin/edit_brand.ejs", { brand: brand[0] }); // Pass the brand data to the edit form
        } else {
            res.status(404).send("Brand not found");
        }
    } catch (error) {
        console.error("Error fetching brand:", error);
        res.status(500).send("Error fetching brand details");
    }
});
router.post("/update_brand/:id", async function(req, res) {
  try {
      const brandId = req.params.id;
      let { brand_name, brand_details } = req.body;
      let brand_image = req.body.existing_image; // Use the existing image by default

      // Handle image upload if a new image is provided
      if (req.files && req.files.brand_image) {
          brand_image = new Date().getTime() + req.files.brand_image.name;
          req.files.brand_image.mv("public/uploads/" + brand_image);
      }

      // Update brand details in the database
      const sql = `
          UPDATE brand 
          SET brand_name = ?, brand_image = ?, brand_details = ? 
          WHERE brand_id = ?`;

      await exe(sql, [brand_name, brand_image, brand_details, brandId]);
      res.redirect("/admin/brand_list"); // Redirect to the brand list after updating
  } catch (error) {
      console.error("Error updating brand:", error);
      res.status(500).send("Error updating brand");
  }
});

  





  // product
   router.get("/add_product", async function(req,res)
     { 
    var brand= await exe(`SELECT * FROM brand`);
    var cats= await exe(`SELECT * FROM category`);
    var obj={"brand":brand,"cats":cats};
    res.render("admin/add_product.ejs",obj);
    });

    router.post("/save_product", async function(req,res)
     {
      console.log(req.files);
      var product_image1="";
      var product_image2="";
      var product_image3="";
      var product_image4="";

      if(req.files)
        {
        if(req.files)
        {
          product_image1=new Date().getTime()+req.files.product_image1.name;
          req.files.product_image1.mv("public/uploads/"+product_image1);
        }
        {
          product_image2=new Date().getTime()+req.files.product_image2.name;
          req.files.product_image2.mv("public/uploads/"+product_image2);
        }
        {
          product_image3=new Date().getTime()+req.files.product_image3.name;
          req.files.product_image3.mv("public/uploads/"+product_image3);
        }
        {
          product_image4=new Date().getTime()+req.files.product_image4.name;
          req.files.product_image4.mv("public/uploads/"+product_image4);
        }
        }
      var sql=`INSERT INTO product(product_name,product_price,product_purchase_price,product_brand_id,product_category_id,product_type,product_details,product_size,product_color,product_image1,product_image2,product_image3,product_image4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        var d= req.body;
        var data = await exe(sql,[d.product_name,d.product_price,d.product_purchase_price,d.product_brand_id,d.product_category_id,d.product_type,d.product_details,d.product_size,d.product_color,product_image1,product_image2,product_image3,product_image4]);
      //  res.send(data);
      res.redirect("/admin/add_product");
      });
    

      router.get("/product_list", async function (req,res) 
        {
        var sql=
        `SELECT * FROM product,category,brand WHERE
        product.product_category_id = category.category_id
        AND product.product_brand_id=brand.brand_id
        `;
        var product= await  exe(sql);
        var obj={"product":product};
        res.render("admin/product_list.ejs",obj);
        });






        router.get("/delete_product/:id", async function (req, res) {
          try {
            const id = req.params.id;
            const sql = `DELETE FROM product WHERE product_id = ?`;
            await exe(sql, [id]);
            res.redirect("/admin/product_list");
          } catch (err) {
            res.send("Error deleting product");
          }
        });

        router.get("/edit_product/:id", async function (req, res) {
          try {
            const id = req.params.id;
            const product = await exe(`SELECT * FROM product WHERE product_id = ?`, [id]);
            const categories = await exe(`SELECT * FROM category`);
            const brands = await exe(`SELECT * FROM brand`);
            const obj = { product: product[0], categories, brands };
            res.render("admin/edit_product.ejs", obj);
          } catch (err) {
            res.send("Error loading product data");
          }


          router.post("/update_product/:id", async function (req, res) {
            try {
              const id = req.params.id;
              const d = req.body;
          
              // Handle image updates
              let product_image1 = d.existing_image1;
              let product_image2 = d.existing_image2;
              let product_image3 = d.existing_image3;
              let product_image4 = d.existing_image4;
          
              if (req.files) {
                if (req.files.product_image1) {
                  product_image1 = new Date().getTime() + req.files.product_image1.name;
                  req.files.product_image1.mv("public/uploads/" + product_image1);
                }
                if (req.files.product_image2) {
                  product_image2 = new Date().getTime() + req.files.product_image2.name;
                  req.files.product_image2.mv("public/uploads/" + product_image2);
                }
                if (req.files.product_image3) {
                  product_image3 = new Date().getTime() + req.files.product_image3.name;
                  req.files.product_image3.mv("public/uploads/" + product_image3);
                }
                if (req.files.product_image4) {
                  product_image4 = new Date().getTime() + req.files.product_image4.name;
                  req.files.product_image4.mv("public/uploads/" + product_image4);
                }
              }
          
              const sql = `
                UPDATE product 
                SET product_name = ?, product_price = ?, product_purchase_price = ?, product_brand_id = ?, product_category_id = ?, 
                    product_type = ?, product_details = ?, product_size = ?, product_color = ?, product_image1 = ?, product_image2 = ?, 
                    product_image3 = ?, product_image4 = ? 
                WHERE product_id = ?
              `;
          
              await exe(sql, [
                d.product_name, d.product_price, d.product_purchase_price, d.product_brand_id, d.product_category_id,
                d.product_type, d.product_details, d.product_size, d.product_color,
                product_image1, product_image2, product_image3, product_image4, id
              ]);
          
              res.redirect("/admin/product_list");
            } catch (err) {
              res.send("Error updating product");
            }
          });
          
        });
        
        

        router.get("/order_details/:order_id",async function (req,res) 
        
        {
          var id= req.params.order_id;
          var order_info = await exe(`SELECT * FROM order_info WHERE order_id ='${id}'`);
          var product= await exe (`SELECT * FROM  product ,order_products WHERE  product.product_id = order_products.product_id  AND order_id='${id}'`);
          var obj={"order_info":order_info[0],"product":product};
          console.log(obj);
          res.render("admin/order_details.ejs",obj);
        });
      




      


  router.get("/change_order_status_to_dispatch/:id", async function(req,res)
        {
var sql =`UPDATE order_info SET order_status='dispatch' WHERE
order_id ='${req.params.id}'`;
var data= await exe (sql);
res.redirect("/admin/pending_orders");
        });


        router.get("/change_order_status_to_deliver/:id", async function(req,res)
        {
var sql =`UPDATE order_info SET order_status='deliver' WHERE
order_id ='${req.params.id}'`;
var data= await exe (sql);
res.redirect("/admin/dispatch_orders");
        });
        
        router.get("/pending_orders", async function(req,res){
          var sql=`SELECT * FROM  order_info WHERE order_status ='pending'`;
          var data= await exe(sql);
           var obj={"pending_orders":data}
          res.render("admin/pending_orders.ejs",obj);
        });


        router.get("/dispatch_orders", async function(req,res){
          var sql=`SELECT * FROM  order_info WHERE order_status ='dispatch'`;
          var data= await exe(sql);
           var obj={"dispatch_orders":data}
          res.render("admin/dispatch_orders.ejs",obj);
        });






        // Delivered Orders
router.get("/delivered_orders", async function (req, res) {
  try {
    const sql = `SELECT * FROM order_info WHERE order_status = 'deliver'`;
    const data = await exe(sql);
    const obj = { delivered_orders: data };
    res.render("admin/delivered_orders.ejs", obj);
  } catch (err) {
    console.error("Error fetching delivered orders:", err);
    res.status(500).send("Error fetching delivered orders");
  }
});

       module.exports=router;


// i have this data
// use this data and design order page





// CREATE TABLE category(category_id INT PRIMARY KEY AUTO INCREMENT,
//     category_name VARCHAR(100),
//     category_details VARCHAR TEXT
    
// )

 
// pending order list page for admin with bootstarp 5 
