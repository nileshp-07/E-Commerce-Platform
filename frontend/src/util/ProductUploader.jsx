import axios from 'axios';
import products  from "../data/products.json"
import React, { useState, useEffect } from 'react';
import { addProduct } from '../services/operations/productAPI';

function ProductAdder() {
  const [loading, setLoading] = useState(false);


  // Function to upload multiple images to Cloudinary
    const uploadImagesToCloudinary = async (imageUrls) => {
        const uploadedImageUrls = [];
        for (const imageUrl of imageUrls) {
            const uploadedImageUrl = await uploadImageToCloudinary(imageUrl);
            if (uploadedImageUrl) {
                uploadedImageUrls.push(uploadedImageUrl);
            }
        }
        return uploadedImageUrls;
    };


    // Function to upload an image to Cloudinary
    const uploadImageToCloudinary = async (imageUrl) => {
        try {
            const cloudinaryResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/dlwlo89mc/image/upload',
                {
                    file: imageUrl,
                    upload_preset: 'onhlmpjh', // Replace with your Cloudinary unsigned upload preset
                }
            );

            console.log('Image uploaded to Cloudinary:', cloudinaryResponse.data.secure_url);
            return cloudinaryResponse.data.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return null;
        }
    };



  useEffect(() => {
    const addProducts = async () => {
      try {
        setLoading(true);
        
        for (const product of products) {
            try{
                  console.log("Adding Product of Index ", product.index)


                  const title = product?.product_name;
                  const discountedPrice = product?.discounted_price;
                 
                  if(product.product_category_tree.length >= 3)
                  {
                      const  categories = {
                        category : product.product_category_tree[0],
                        subCategory : product.product_category_tree[1],
                        subSubCategory : product.product_category_tree[2],
                      }
                      

                      const sellerId = "660a8f2007ef7b9ad8c14669"
                      const stocks = Math.ceil(50*Math.random());
                      const brand = product.brand;
                      const price = product.retail_price;
                      const productSpecifications = product.product_specifications.product_specification;
                      const specifications = {};


                      for(const item of productSpecifications)
                      {
                         if(item.key && item.value)
                         specifications[item.key] = item.value
                      }
                      const discountPercentage =  Math.round(((price - discountedPrice) * 100) / price)
                      let images;

                    //   await uploadImagesToCloudinary(product.image)
                    //   .then((response) => {
                    //       console.log('All product images processed and saved successfully.');
                    //       images = response;
                    //   })
                    //   .catch(error => {
                    //       console.error('Error processing and saving products:', error);
                    //   });
                    //   const thumbnail = images[0];
    
                      console.log(title);
                      console.log(discountedPrice);
                      console.log(categories);
                      console.log(sellerId);
                      console.log(stocks);
                      console.log(brand);
                      console.log(price);
                      console.log(specifications);
                      console.log(discountPercentage);
                    //   console.log(thumbnail);
                    //   console.log(images);


                      
                    //   if(title && price && categories && sellerId && thumbnail && images && discountedPrice && specifications)
                    //   {
                    //     //   await addProduct(title , price ,categories,sellerId,thumbnail,images ,stocks, brand, discountPercentage, discountedPrice, specifications);
                    //       console.log('Product with index ',product.index, 'has been successfully uploaded')
                    //   }
                    
                  }

            }
            catch(error)
            {
                console.log("product could not be upload of index", product.index);
                console.log(error);
            }
        }

        alert('All products added successfully!');
      } catch (error) {
        console.error('Error adding products:', error);
        alert('Failed to add products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    addProducts(); // Call addProducts when component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="h-screen w-screen grid place-items-center">
       <div className="text-4xl font-semibold">
          {loading ? 'Adding Products...' : 'Products added successfully!'}
       </div>
    </div>
  );
}

export default ProductAdder;
