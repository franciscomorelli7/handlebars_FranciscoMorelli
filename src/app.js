import express from "express";
import productRouter from "./router/product.routes.js";
import cartRouter from "./router/cart.routes.js"
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import * as path from "path"
import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager()

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine("handlebars", engine())
app.set ("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.use("/", express.static(__dirname + "/public"))


app.get("/", async (req,res)=>{
    let todosLosProductos = await product.getProducts()

    res.render("home", {
        title :"Handlebars",
        products: todosLosProductos

    })

})


app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)


app.listen (PORT, () => {
    console.log(`Servidor express en puerto ${PORT}`)
})