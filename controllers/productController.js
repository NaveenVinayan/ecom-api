import multer from "multer";
import path from "path";
import Product from "../models/Product.js";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      productImage: req.file.filename,
    });

    await newProduct.save();
    return res.status(200).json({ success: true, message: "Product created" });
  } catch (error) {
    console.log(error, "error");

    return res
      .status(500)
      .json({ success: false, error: "server error in adding product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get products server error" });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById({ _id: id });
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get product server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price } = req.body;

    const product = await Product.findById({ _id: id });

    if (!product) {
      return res
        .status(400)
        .json({ success: false, error: "employee not found" });
    }

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        price,
      }
    );

    if (!updateProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

    return res.status(200).json({ success: true, message: "Product updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update Product server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "delete product server error" });
  }
};

export {
  addProduct,
  upload,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
