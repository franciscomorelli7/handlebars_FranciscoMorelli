import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartRouter = Router()

const carrito =  new CartManager

cartRouter.post("/", async (req, res)=>{
    res.send(await carrito.agregarAlCarrito())
})
cartRouter.get("/", async(req,res)=>{
    res.send(await carrito.leerCarrito())
})

cartRouter.get("/:cid", async(req,res)=>{
    res.send(await carrito.getCartById(req.params.cid))
})

cartRouter.post("/:cid/products/:pid", async(req,res)=>{
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await carrito.agregarProductosAlCarrito(cartId, prodId))
})
export default cartRouter