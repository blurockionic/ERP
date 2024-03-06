import ExcelJS from "exceljs";
import csv from "csv-parser";
import { Lead } from "../model/lead_model.js";

//IMPORT DATA FROM EXCEL OR CSV FILE
export const importCsvOrExcel = async (req, res) => {
  // console.log("working")
  // console.log(req.file)
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const buffer = req.file.buffer;
    const fileName = req.file.originalname;

    let data;

    if (fileName.endsWith(".xlsx")) {
      // Read data from Excel file
      data = await readExcelData(buffer);
    } else if (fileName.endsWith(".csv")) {
      // Read data from CSV file
      data = await readCsvData(buffer);
    } else {
      return res.status(400).send("Unsupported file type.");
    }

    // Save data to MongoDB
    await Lead.insertMany(data);

    res.status(200).send("Data imported successfully.");
  } catch (error) {
    console.error("Error importing data:", error);
    res.status(500).send("Internal Server Error");
  }

  // Function to read data from an Excel file
  async function readExcelData(buffer) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];

    // Assuming data array and worksheet are defined
    const data = [];

    // Assuming the first row contains the headers
    const headers = worksheet.getRow(1).values;

    let value = ''
    // Iterate over each row
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        // Skip header row
        const rowData = {};

        // Iterate over each cell in the row and map to corresponding field names
        row.eachCell((cell, colNumber) => {
          const header = headers[colNumber];
          value = cell.value;

          // Remove extra quotes around _id value
          if (header === "_id" && typeof value === "string") {
            value = value.replace(/^"(.*)"$/, "$1");
          }

          rowData[header] = value;
        });

        data.push(rowData);
      }
    });

    return data;
  }

  // Function to read data from a CSV file
  async function readCsvData(buffer) {
    const data = [];
    await new Promise((resolve, reject) => {
      const stream = csv();
      stream.on("data", (row) => {
        data.push(row);
      });
      stream.on("end", () => {
        resolve();
      });
      stream.on("error", (error) => {
        reject(error);
      });

      const readableStream = require("stream").Readable.from(buffer);
      readableStream.pipe(stream);
    });

    return data;
  }
};
