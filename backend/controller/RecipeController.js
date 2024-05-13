import { CustomerOrder } from "../model/customerOrder.js";
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

    // Send a success response
    res.status(201).json({
      message: "Recipe created successfully",
      recipe: savedRecipe,
      transformedRecipe: savedRecipe,
    });
  } catch (error) {
    console.error("Error occurred while creating recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRequiredRecipe = async (req, res) => {
  console.log("working");
  // orderId
  const { id } = req.params;
  try {

    // get the maxpaxcount
    const { maxPaxCount } = req.body;

    //check required recipe from order
    const requiredRecipeOrder = await CustomerOrder.findOne({ _id: id }).lean();

    if (!requiredRecipeOrder) {
      return res.status(400).json({
        success: false,
        message: "Document not found!",
      });
    }

   
    //now find out the all recipe

    let breakfastSnacks = [];
    let breakfastSoupAndSalad = [];
    let breakfastMainCourse = [];

    let lunchSnacks = [];
    let lunchSoupAndSalad = [];
    let lunchMainCourse = [];
    let lunchIceCream = [];

    let dinnerSnacks = [];
    let dinnerSoupAndSalad = [];
    let dinnerMainCourse = [];
    let dinnerIceCream = [];

    //put all ordered recipe in one array
    // breakfast
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.breakfast.snacks.length;
      i++
    ) {
      breakfastSnacks.push(
        requiredRecipeOrder.cateringOrder.breakfast.snacks[i]
      );
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.breakfast.soupAndSalad.length;
      i++
    ) {
      breakfastSoupAndSalad.push(
        requiredRecipeOrder.cateringOrder.breakfast.soupAndSalad[i]
      );
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.breakfast.mainCourse.length;
      i++
    ) {
      breakfastMainCourse.push(
        requiredRecipeOrder.cateringOrder.breakfast.mainCourse[i]
      );
    }

    // lunch
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.lunch.snacks.length;
      i++
    ) {
      lunchSnacks.push(requiredRecipeOrder.cateringOrder.lunch.snacks[i]);
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.lunch.soupAndSalad.length;
      i++
    ) {
      lunchSoupAndSalad.push(
        requiredRecipeOrder.cateringOrder.lunch.soupAndSalad[i]
      );
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.lunch.mainCourse.length;
      i++
    ) {
      lunchMainCourse.push(
        requiredRecipeOrder.cateringOrder.lunch.mainCourse[i]
      );
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.lunch.iceCream.length;
      i++
    ) {
      lunchIceCream.push(requiredRecipeOrder.cateringOrder.lunch.iceCream[i]);
    }

    // dinner
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.dinner.snacks.length;
      i++
    ) {
      dinnerSnacks.push(requiredRecipeOrder.cateringOrder.dinner.snacks[i]);
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.dinner.soupAndSalad.length;
      i++
    ) {
      dinnerSoupAndSalad.push(
        requiredRecipeOrder.cateringOrder.dinner.soupAndSalad[i]
      );
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.dinner.mainCourse.length;
      i++
    ) {
      dinnerMainCourse.push(
        requiredRecipeOrder.cateringOrder.dinner.mainCourse[i]
      );
    }
    for (
      let i = 0;
      i < requiredRecipeOrder.cateringOrder.dinner.iceCream.length;
      i++
    ) {
      dinnerIceCream.push(requiredRecipeOrder.cateringOrder.dinner.iceCream[i]);
    }

    let orderRecipes = [
      ...breakfastSnacks,
      ...breakfastSoupAndSalad,
      ...breakfastMainCourse,
      ...lunchSnacks,
      ...lunchSoupAndSalad,
      ...lunchMainCourse,
      ...lunchIceCream,
      ...dinnerSnacks,
      ...dinnerSoupAndSalad,
      ...dinnerMainCourse,
      ...dinnerIceCream,
    ];

    console.log(orderRecipes);

    // get all recipe
    const getAllRecipe = await Recipe.find({});

    if (!getAllRecipe) {
      res.status(400).json({
        success: false,
        message: "Document not faound!",
      });
    }

     // find the maxPaxCount
     const averageMaxPaxCount =
     (parseInt(requiredRecipeOrder.cateringOrder.breakfast.totalPackCount) +
       parseInt(requiredRecipeOrder.cateringOrder.lunch.totalPackCount) +
       parseInt(requiredRecipeOrder.cateringOrder.dinner.totalPackCount)) /
     3;

   console.log(parseInt(averageMaxPaxCount));

   // Decrease totalPaxCount by 25%
   const decreasedPaxCount = averageMaxPaxCount * 0.75; // 25% decrease

    const requiredRecipeIngredients = [];
    // match all recipe order with our recipe module
    for (const recipe of getAllRecipe) {
      const result = await Recipe.aggregate([
        // Stage 1
        {
          $match: { itemName: recipe }, // Match newly created document
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
                      then: {
                        $divide: [
                          {
                            $multiply: [
                              "$$recipe.itemQuantity",
                              decreasedPaxCount,
                            ],
                          },
                          recipeCount,
                        ],
                      },
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
      requiredRecipeIngredients.push(result);
    }

    console.log(requiredRecipeIngredients);

    //now cal

    //check the
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};


// update recipe controller
export const updateRecipesDetails = async(req, res) =>{
    const {id} = req.params 
    try {
         // Extract recipe details from the request body
    const {
        recipeName,
        recipeCategory,
        recipeSubCategory,
        recipeRawMaterial,
        maxPaxCount,
      } = req.body;

      const isDocumentExist = await Recipe.findById(id)

      if(!isDocumentExist){
        res.status(400).json({
            success: false,
            message: "Docuement not found"
        })
      }
  
      isDocumentExist.recipeName =  recipeName
      isDocumentExist.recipeCategory = recipeCategory
      isDocumentExist.recipeSubCategory = recipeSubCategory
      isDocumentExist.recipeRawMaterial =  recipeRawMaterial
      isDocumentExist.maxPaxCount =  maxPaxCount 

      // Save the recipe to the database
      const savedRecipe = await isDocumentExist.save();
  
      // Send a success response
      res.status(201).json({
        success: true,
        message: "Recipe created successfully",
        recipe: savedRecipe,
      });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error
        })
    }
}

//delete recipe controller
export const deleteRecipe =  async(req, res)=>{
    const {id} = req.params 
    try {
        await Recipe.deleteOne({_id: id})

        res.status(200).json({
            success: false,
            message: 'Deleted successfully!',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

//get all recipe controller
export const getAllRecipe = async(req, res)=>{
    try {
        const allRecipe =  await Recipe.find({})

        res.status(200).json({
            success: true,
            allRecipe
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        })
    }
}


