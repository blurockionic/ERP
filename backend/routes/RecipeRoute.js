import express  from "express"
import { CreateNewRecipe, deleteRecipe, getAllRecipe, getRequiredRecipe, updateRecipesDetails } from "../controller/RecipeController.js"

const router =  express.Router()

//route for connect creanew recipe controller
router.post("/new", CreateNewRecipe)

//router for get recipe controller

router.get("/specific/order/recipe/:id", getRequiredRecipe)

//get all recipe
router.get("/all", getAllRecipe)

//delete 
router.delete("/:id", deleteRecipe)

//update
router.put("/:id", updateRecipesDetails)


export default router