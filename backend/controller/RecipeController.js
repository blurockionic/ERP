import { Recipe } from "../model/recipe_model.js";

//for create recipe

export const CreateNewRecipe = async (req, res) => {
    try {
        // Extract recipe details from the request body
        const {
            recipeName,
            recipeCategory,
            recipeSubCategory,
            recipeRawMaterial,
            maxPaxCount,
        } = req.body;
    
        // Create a new recipe document
        const newRecipe = new Recipe({
            recipeName,
            recipeCategory,
            recipeSubCategory,
            recipeRawMaterial,
            maxPaxCount,
        });
    
        // Save the recipe to the database
        const savedRecipe = await newRecipe.save();
    
        // Decrease totalPaxCount by 25%
        const decreasedPaxCount = maxPaxCount * 0.75; // 25% decrease
        // const PaxCount = 200; // 25% decrease

        // for recipe manager 
        const recipeCount = 100
    
        // Transform recipe
        const transformedRecipe = await Recipe.aggregate([
            // Stage 1
            {
                $match: { _id: savedRecipe._id }, // Match newly created document
            },
            // Stage 2
            {
                $project: {
                    requiredRecipeRawMaterial: {
                        $map: {
                            input: "$recipeRawMaterial",
                            as: "recipe",
                            in: {
                                itemName: "$$recipe.itemName",
                                requiredQuantity: {
                                    $cond: {
                                        if: {
                                            $and: [
                                                { $gt: [decreasedPaxCount, 100] }, // 100 < totalPaxCount < 200
                                                { $lte: [decreasedPaxCount, 200] },
                                            ],
                                        },
                                        then: {$divide: [{ $multiply: ["$$recipe.itemQuantity", decreasedPaxCount] }, recipeCount] }, 
                                        else: "$$recipe.itemQuantity", // Use original quantity if conditions are not met
                                    },
                                },
                                itemQuantityUnit: "$$recipe.itemQuantityUnit",
                            },
                        },
                    },
                },
            },
        ]);
    
        // Log transformed recipe
        console.log("Transformed recipe raw material:", transformedRecipe);
    
        // Send a success response
        res
            .status(201)
            .json({
                message: "Recipe created successfully",
                recipe: savedRecipe,
                transformedRecipe: transformedRecipe,
            });
    } catch (error) {
        console.error("Error occurred while creating recipe:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
};
