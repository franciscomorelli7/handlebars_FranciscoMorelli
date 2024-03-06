import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productRouter = Router()
const products = new ProductManager

productRouter.get("/", async(req,res)=>{
    res.send(await products.getProducts())
})
productRouter.get("/:cid", async(req,res)=>{
    let id = req.params.cid
     res.send(await products.getProductById(id))
})


productRouter.post("/", async(req, res)=>{
    let nuevoProducto = req.body;
    res.send (await products.agregarProductos(nuevoProducto))
})

productRouter.delete("/:cid", async (req,res)=>{
    let id = req.params.cid
     res.send(await products.deleteProductsById(id))
})

productRouter.put("/:cid", async (req,res)=>{
    let id = req.params.cid
    let updateBody = req.body
    res.send(await products.updateProductsById(id,updateBody))
})

export default productRouter