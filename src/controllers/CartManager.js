import {promises as fs} from "fs"
import {nanoid} from "nanoid"
import ProductManager from "./ProductManager.js"
import __dirname from "../utils.js"

const todosLosProductos = new ProductManager

class CartManager {
    constructor(){
        this.path = `${__dirname}/models/cart.json`
    }


    leerCarrito =async()=>{

        let carrito = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carrito)
    }
    writeCart = async(cart)=>{
        await fs.writeFile(this.path, JSON.stringify(cart));
    }
    carritosExistentes=async(id)=>{
        let carrito = await this.leerCarrito();
        return carrito.find(cart => cart.id===id)
    }

    agregarAlCarrito= async()=>{
        let carritoViejo = await this.leerCarrito()
        let id = nanoid()
        let nuevoCarrito = [{id:id, products : [], ...carritoViejo}]
        await this.writeCart(nuevoCarrito)
        return "Se agrego correctamente"
    }
    getCartById = async(id)=>{
        let carrito = await this.carritosExistentes(id);
        
        if (carrito){
            return carrito
        }else{
            return "No hay ningun producto con ese ID"
        }
    }
    agregarProductosAlCarrito=async(cartId,productId)=>{
        let cartById = await this.carritosExistentes(cartId)
        if(!cartById) return "Carrito no encontrado"
        let productById = await todosLosProductos.productosExistentes(productId)
        if(!cartById) return "Producto no Encontrado"  

        let todosLosCarritos = await this.leerCarrito()
        let filtroCarrito = todosLosCarritos.filter(prod=>prod.id != productId)
        if(cartById.products.some(prod => prod.id === productId)){
            let productosEnCarrito = cartById.products.find(prod => prod.id === productId)
            productosEnCarrito.quantity++
            let cartConcat = [productosEnCarrito,...filtroCarrito]
            await  this.writeCart(cartConcat)
            return "El producto se agrego correctamente."
        }

        
        
        
        let cartConcat = [{id:cartId, products : [{id:productById.id, quantity: 1}]},...filtroCarrito]
        await  this.writeCart(cartConcat)
        return "El producto se agrego correctamente."
        
    }
}

export default CartManager

