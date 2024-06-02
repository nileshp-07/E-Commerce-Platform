const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");
const {User} = require("../models/user");
const mailSender = require("../utils/mailSender");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)



exports.buyProducts = async (req, res) => {
    try{
      const {products, address, contactNumber} = req.body;
      const {email,id} = req.user;
      const addressJSON = JSON.parse(address);

      if(products?.length === 0)
      {
        return res.status(404).json({
            success: false,
            message : "No products found"
        })
      }

      let orders = [];
      for(const item of products)
      {
          const product = item.productId;
          const qty = item.qty;

          const order = await Order.create({
            buyer: id,
            seller: product.seller,
            product : product,
            qty,
            totalPrice : product.discountedPrice*qty,
            paymentMethod : "Card",
            buyersContactNumber: contactNumber,
            orderStatus : "Pending",
            shippingAddress: {
              street :  addressJSON.street,
              city : addressJSON.city,
              postalCode : addressJSON.postalCode,
              state : addressJSON.state,
              country  : addressJSON.country,
             }
          })

          orders.push(order._id);
      }

      await this.updateOrders(req, res);

      const lineItems = products.map((product) => (
        {
            price_data : {
                currency : "INR",
                product_data : {
                    name : product.productId.title,
                    images : [product.productId.thumbnail]
                },
                unit_amount : product.productId.discountedPrice*100
            },
            quantity : product.qty
        }
      ));

      const session = await stripe.checkout.sessions.create({
         payment_method_types : ["card"],
         line_items : lineItems,
         mode : "payment",
         success_url : "https://ecommerce-platform-nileshp07.vercel.app/payment-success",
         cancel_url : "https://ecommerce-platform-nileshp07.vercel.app/payment-fail",
         customer_email : email,
         billing_address_collection: 'required', // Require billing address
        shipping_address_collection: {
            allowed_countries: ['IN'], // Allow only Indian addresses
        },
        metadata: {
            orders : JSON.stringify(orders),
            email : email,
            id : id
        },
      })


      // console.log("Session : ",session)


      res.status(200).json({
        success : true,
        message : "Products buyed successfully",
        sessionId : session.id
      })

    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.createOrder = async (req , res) => {
   try{
      const {products, isCOD, address, contactNumber} = req.body;
      const {id, email} = req.user;
      const addressJSON = JSON.parse(address);


      // 1.  make the cart empty
      if(products.length > 1)  
      {
          const updateCart = await Cart.findByIdAndUpdate(id, {
                                                              products : []
                                                            })
      }


      // 2.  increment the sold field of product and insert the product id into user model and create the order for each products
      for(const item of products)
      {
        const product = item.productId;
        const qty = item.qty;
        // 1. increment the sold
        const updatedProduct = await Product.findByIdAndUpdate(product._id,{
                                                            $inc: { sold: qty }  //increment the sold by
                                                          },
                                                          {new: true}); 
        // 2. decreament the stock
        const updatedProducte = await Product.findByIdAndUpdate(product._id,{
                                                          $dec: { stocks: qty }  //increment the sold by
                                                        },
                                                        {new: true}); 

        // 3. insert the product id into userSchema
        const user = await User.findByIdAndUpdate(id,{
                                                $push : {
                                                  products : product._id
                                                }
                                              },
                                              {new: true});



        // 4. create an order for each product;
        const paymentMethod = isCOD ? "Cash" : "Card";
        const order = await Order.create({
           buyer: id,
           seller: product.seller,
           product : product,
           qty,
           buyersContactNumber: contactNumber,
           shippingAddress : address, 
           totalPrice : product.discountedPrice*qty,
           paymentMethod,
           shippingAddress: {
            street :  addressJSON.street,
            city : addressJSON.city,
            postalCode : addressJSON.postalCode,
            state : addressJSON.state,
            country  : addressJSON.country,
           }
        })
      }


      // send the mail to the user 
      const mailResponse = await mailSender(email, "products has been ordered", "you have successfully orders the products ")

      return res.status(200).json({
        success: true,
        message : "Payment verified and order created",
      })


   }
   catch(error)
   {
      console.log(error);
      return res.status(401).json({
          success : false,
          message : error.message
      })
   }
}




exports.updateOrders = async (userId, email, orders) => {
  try{
     // 1.  make the cart empty
     if(orders.length > 1)  
     {
         const updateCart = await Cart.findByIdAndUpdate(userId, {
                                                             products : []
                                                           })
     }


     // 2.  increment the sold field of product and insert the product id into user model and create the order for each products
     for(const item of orders)
     {
       const order = await Order.findById(item)
       const productId = order.product;
       const qty = order.qty;
       // 1. increment the sold and decreament the stock
       const updatedProduct = await Product.findByIdAndUpdate(productId,{
                                                           $inc: { sold:  qty},  //increment the sold 
                                                           $dec: { stocks: qty }
                                                          },
                                                         {new: true}); 
       
       // 2. insert the product id into userSchema
       const user = await User.findByIdAndUpdate(userId,{
                                               $push : {
                                                 products : productId
                                               }
                                             },
                                             {new: true});


       // 4. update order
       const updateOrder = await Order.findByIdAndUpdate(order._id ,{
                                                            orderStatus : "Success"
                                                        })
     }


     // send the mail to the user 
     const mailResponse = await mailSender(email, "products has been ordered", "you have successfully orders the products ")

     return res.status(200).json({
       success: true,
       message : "Payment verified and order created",
     })


  }
  catch(error)
  {
     console.log(error);
     return res.status(401).json({
         success : false,
         message : error.message
     })
  }
}
