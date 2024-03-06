import ExcelJS from "exceljs";
import { Lead } from "../model/lead_model.js";

//export data
export const exportToExcel = async (req, res) => {
  try {
    const data = await Lead.find().lean();

    if (!data || data.length === 0) {
      console.log("No data to export.");
      res.status(404).send("No data to export.");
      return;
    }
    // console.log(data)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Write column headers
    const columns = Object.keys(data[0]);
    worksheet.addRow(columns);

    // Write data rows
    data.forEach((row) => {
      const values = columns.map((column) => row[column]);
      worksheet.addRow(values);
    });

    // Save the workbook to a file
    // Set the file path for saving
   // Generate a unique filename based on the current timestamp
   const timestamp = new Date().toISOString().replace(/:/g, '-');
   const fileName = `LeadData_${timestamp}.xlsx`;
   // Set response headers for Excel download
//    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

   // Set the filePath before saving the workbook
   const filePath = `c:/Users/blurock/Downloads/${fileName}`;

   // Save the workbook to a file
   await workbook.xlsx.writeFile(filePath);

   // Send the Excel file to the client
//    await workbook.xlsx.write(res);
//    res.end();


    res.status(200).json({
        success: true,
        message: 'Data exported successfully.'
    })
  } catch (error) {
    console.error("Error exporting data:", error);
  } 
};
