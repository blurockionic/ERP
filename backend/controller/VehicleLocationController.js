import { Vehicle } from '../model/location.model.js';

export const vehicleLocation = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});

    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    console.error('Error fetching vehicle locations:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
