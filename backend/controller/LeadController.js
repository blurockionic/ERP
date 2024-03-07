import { Lead } from "../model/lead_model.js";

//create new lead
export const newLead = async (req, res) => {
  try {
    //fetch the details from req body
    const {
      leadId,
      firstName,
      lastName,
      mobileNumber,
      email,
      stageMoveReason,
      stage,
      creationDate,
      gender,
      dateOfBirth,
      owner,
      leadDescription,
      maritalStatus,
      assignBy,
      createdBy,
      lastActivityDate,
      lastModifiedDate,
    } = req.body;

    //validate required
    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide mobile number",
      });
    }
    // validate required state to move
    // if (!stageMoveReason) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide the reason of moving the stage",
    //   });
    // }

    //create lead
    const newLead = new Lead({
      leadId,
      firstName,
      lastName,
      mobileNumber,
      email,
      stageMoveReason,
      stage,
      creationDate,
      gender,
      dateOfBirth,
      owner,
      leadDescription,
      maritalStatus,
      assignBy,
      createdBy,
      lastActivityDate,
      lastModifiedDate,
    });

    // Save the lead to the database
    await newLead.save();

    res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      lead: newLead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

//get all the data
export const getLead = async (req, res) => {
  try {
    const allLeads = await Lead.find();
    res.status(200).json({
      success: false,
      allLeads: allLeads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update the lead
export const updateLead = async (req, res) => {
  try {
    const leadIdToUpdate = req.params.id;
    const updateFields = req.body;

    console.log(leadIdToUpdate)

    // Validate if at least one field to update is provided
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field to update is required." });
    }

    // Update the lead by leadId
    const updatedLead = await Lead.findOneAndUpdate(
      { _id: leadIdToUpdate },
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    // Check if the lead was found and updated
    if (!updatedLead) {
      return res.status(404).json({ error: "Lead not found." });
    }

    res
      .status(200)
      .json({ message: "Lead updated successfully.", lead: updatedLead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete the lead
export const deleteLead = async (req, res) => {
  try {
    const leadId = req.params.id;

    // Delete the lead by leadId
    const deletedLead = await Lead.findOneAndDelete({ _id: leadId });

    // Check if the lead was found and deleted
    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        error: "Lead not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully.",
      lead: deletedLead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        success: false,
        error: "Internal Server Error" 
    });
  }
};

