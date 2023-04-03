const express = require("express");
const {ProductModel}=require('../Model/product.model')
const productRouter = express.Router();


 

productRouter.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const page = Math.max(0, req.query.page || 0);
  const sort = req.query.sortBy;
  let q = req.query.q;
  let category=req.query.category
  let brand=req.query.brand
  try {
    if (q && sort) {
      // search functionality
      let a;
      if (sort == "asc") {
        a = 1;
      } else if (sort == "desc") {
        a = -1;
      }
      const product = await ProductModel.find({
        name: { $regex: q, $options: "$i" },
      })
        .limit(limit)
        .skip(limit * page)
        .sort({ discounted_price: a });
      res.status(201).json({ data: product, status: "Success" });
      return;
    } else if (q) {
      const product = await ProductModel.find({
        name: { $regex: q, $options: "$i" },
       
      }) 
        .limit(limit)
        .skip(limit * page);
      res.status(201).json({ data: product, status: "Success" });
      return; 



    }else if (category) {

      const product = await ProductModel.find({
        
category: { $regex: category, $options: "$i" },
      })
      
        /*.limit(limit)
        .skip(limit * page);*/
      res.status(201).json({ data: product, status: "Success" });
      return;
    }

    else if (brand) {

      const product = await ProductModel.find({
        
brand: { $regex: brand, $options: "$i" },
      })
      
        /*.limit(limit)
        .skip(limit * page);*/
      res.status(201).json({ data: product, status: "Success" });
      return;
    }



    const product = await ProductModel.find()
      .limit(limit)
      .skip(limit * page);
    res.status(201).json({ data: product, status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: "Failed" });
  }
});


productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.find({ _id: id });
    res.status(201).json({ data: product, status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: "Failed" });
  }
});



productRouter.post("/add", async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    product.save();
    res
      .status(201)
      .json({ message: "Product added successfully", status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: "Failed" });
  }
});



productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
    res
      .status(201)
      .json({ message: "Data update successfully", status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: "Failed" });
  }
});


productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete({ _id: id });
    res
      .status(201)
      .json({ message: "Data delete successfully", status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: "Failed" });
  }
});

module.exports = {
  productRouter,
};