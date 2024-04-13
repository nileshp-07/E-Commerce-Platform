const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.buyProducts = async (req, res) => {
    try{
      const {products} = req.body;
      const {email} = req.user;

      const address = {
         name : "Nilesh Patidar",
         line1 : "viswas nagar",
         line2 : "viswas nagar",
         city : "pithampur",
         postal_code : "573238",
         state : "m.p.",
         country : "India"
      }

      console.log("products: ",products);
      if(products?.lenght === 0)
      {
        return res.status(404).json({
            success: false,
            message : "No products found"
        })
      }


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


      console.log('testing check', lineItems);

      const session = await stripe.checkout.sessions.create({
         payment_method_types : ["card"],
         line_items : lineItems,
         mode : "payment",
         success_url : "http://localhost:3000/payment-success",
         cancel_url : "http://localhost:3000/payment-fail",
         customer_email : email,
         billing_address_collection: 'required', // Require billing address
        shipping_address_collection: {
            allowed_countries: ['IN'], // Allow only Indian addresses
        },
        metadata: {
            shipping_address: JSON.stringify(address),
        },
      })


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