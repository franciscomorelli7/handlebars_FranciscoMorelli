import {promises as fs} from "fs"
import {nanoid} from "nanoid"
import __dirname from "../utils.js"
class ProductManager{
    constructor(){
        this.path=`${__dirname}/models/products.json`
    }

    leerProductos =async()=>{

        let productos = await fs.readFile(this.path, "utf-8")
        return JSON.parse(productos)
    }

    productosExistentes=async(id)=>{
        let products = await this.leerProductos();
        return products.find(prod => prod.id===id)
    }

    writeProducts = async(product)=>{
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    agregarProductos = async(product)=>{
        let productosViejos = await this.leerProductos()
        product.id = nanoid()
        let todosLosProductos = [...productosViejos, product]
        await this.writeProducts(todosLosProductos)
        return "Se agrego correctamente."
    }
    getProducts = async()=>{
        return await this.leerProductos()
    }
    getProductById = async(id)=>{
        let products = await this.leerProductos();
        let buscarPorId = products.find(prod => prod.id === id)
        if (buscarPorId){
            return buscarPorId
        }else{
            return "No hay ningun producto con ese ID"
        }
    }
    deleteProductsById=async(id)=>{
        let products = await this.leerProductos();
        let productosExistentes = products.some(prod => prod.id===id)
        if (productosExistentes){
            let filtroDeProductos = products.filter(prod => prod.id != id)
            await this.writeProducts(filtroDeProductos)
            return "Se elimino correctamente el producto."
        }
         return "El producto que quiere eliminar no existe."
        
    }   
    updateProductsById = async(id, product)=>{
        let productById = await this.productosExistentes(id)
        if(!productById){
            return "producto no encontrado"
        }else{
            await this.deleteProductsById(id)
            let productosViejos = await this.leerProductos()
            let productos=[{...product, id : id},...productosViejos]
            await this.writeProducts(productos)
            return "Se actualizo el producto correctamente"
        }
       
    }
    
}


export default ProductManager

