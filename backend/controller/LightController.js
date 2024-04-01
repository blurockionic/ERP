import { Customer } from "../model/Customer.js";
import { Light } from "../model/light_order_model.js";

// Controller function to create a light entry in the database
export const createLightEntry = async (req, res) => {
  try {
    const {
      customerId,
      lights,
      fan,
      cooler,
      whiteLED,
      coloredLED,
      djLight,
      extension,
      jhumar,
      airConditioner,
      heater,
      GeneratorSet,
    } = req.body;
    //now update the customer details
    const updateCustomerTentOrder =  await Customer.findById(customerId)

    // assign true 
    updateCustomerTentOrder.isLightOrdered =  true

    //update the detail
    await updateCustomerTentOrder.save()
    
    const lightOrder = new Light({
      customerId,
      lights,
      fan,
      cooler,
      whiteLED,
      coloredLED,
      djLight,
      extension,
      jhumar,
      airConditioner,
      heater,
      GeneratorSet,
    });
    await lightOrder.save();
    res.status(201).json(lightOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to update a light entry in the database
export const updateLightEntry = async (req, res) => {
  const { id } = req.params;
  const {
    cutomerId,
    lights,
    fan,
    cooler,
    whiteLED,
    coloredLED,
    djLight,
    extension,
    jhumar,
    airConditioner,
    heater,
    GeneratorSet,
  } = req.body;
  try {
    const lightOrder = await Light.findById(id);
    if (!lightOrder) {
      return res.status(404).json({ message: "Light order not found" });
    }
    lightOrder.cutomerId = cutomerId;
    lightOrder.lights = lights;
    lightOrder.fan = fan;
    lightOrder.cooler = cooler;
    lightOrder.whiteLED = whiteLED;
    lightOrder.coloredLED = coloredLED;
    lightOrder.djLight = djLight;
    lightOrder.extension = extension;
    lightOrder.jhumar = jhumar;
    lightOrder.airConditioner = airConditioner;
    lightOrder.heater = heater;
    lightOrder.GeneratorSet = GeneratorSet;
    await lightOrder.save();
    res.status(200).json(lightOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a light entry from the database
export const deleteLightEntry = async (req, res) => {
  try {
    // Extracting the light ID from the request parameters
    const lightId = req.params.id;

    // Checking if the provided light ID is valid
    if (!lightId) {
      return res.status(400).json({ message: "Invalid light ID" });
    }

    // Finding the light entry by ID in the database
    const existingLightEntry = await Light.findById(lightId);

    // Checking if the light entry exists
    if (!existingLightEntry) {
      return res.status(404).json({ message: "Light entry not found" });
    }

    // Deleting the light entry from the database
    await existingLightEntry.remove();

    // Sending a success response
    res.status(200).json({ message: "Light entry deleted successfully" });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error deleting light entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
