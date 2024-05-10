import express  from "express"
import { CreateNewRecipe } from "../controller/RecipeController.js"

const router =  express.Router()

//route for connect creanew recipe controller
router.post("/new", CreateNewRecipe)


export default router