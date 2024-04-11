import asyncio
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.chrome.options import Options
import pymongo
import pywhatkit as pw
import time
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
import fitz
import datetime

# convert pdf into png 
async def convert_pdf_to_png(pdf_path, output_directory, image_name):
    saved_files = ''
    
    # Get the current time
    current_time = datetime.datetime.now()

    # Format the time without milliseconds and replace colons with underscores
    formatted_time = current_time.strftime("%H_%M_%S")
    print(formatted_time)
    
    # Open the PDF
    pdf_document = fitz.open(pdf_path)
     
     
    # Create the output directory if it doesn't exist
    os.makedirs(output_directory, exist_ok=True)
    
    # Iterate through each page of the PDF
    for page_number in range(len(pdf_document)):
        # Get the page
        page = pdf_document.load_page(page_number)
        
        # Render the page as a pixmap
        pixmap = page.get_pixmap()
        
        # Save the pixmap as a PNG image
        output_file = os.path.join(output_directory, f"IMG_{image_name}_{formatted_time}.png")
        pixmap.save(output_file, "png")
        
        saved_files=output_file
    
    return saved_files
#send convert information into pdf
async def create_pdf(text, directory, filename):
    try:
        # Ensure the directory exists, create it if it doesn't
        os.makedirs(directory, exist_ok=True)

         # Sanitize the filename to replace spaces with underscores without removing the file extension
        name, extension = os.path.splitext(filename)
        filename = "".join(c if c.isalnum() or c in "-_." else "_" for c in name).rstrip("_") + extension
        file_path = os.path.join(directory, filename)
        
        c = canvas.Canvas(file_path, pagesize=letter)
        # Set up fonts
        c.setFont("Helvetica", 12)
        # Write the text to the PDF
        textobject = c.beginText(100, 750)  # (x, y) starting position
        for line in text.split('\n'):
            textobject.textLine(line)
        c.drawText(textobject)
        # Close the PDF
        c.save()

        return file_path
    except Exception as e:
        print("Error creating PDF:", e)
        return None


# function for watch the db 
async def watch_mongodb(db_name, collection_name):
    try:
        client = pymongo.MongoClient("mongodb+srv://biruly:Biruly23@dgbshop.l4tbibb.mongodb.net/")
        client.admin.command('ping')
        print("MongoDB connection successful.")
    except Exception as e:
        print("MongoDB connection failed:", e)
        return

    db = client[db_name]
    collection = db[collection_name]

    cursor = collection.watch()

    print(f"Watching MongoDB collection '{collection_name}' for changes....")
    
    # get customer order
    

    for change in cursor:
        if change["operationType"] == "update":
            latest_insert = collection.find_one(sort=[("_id", -1)])
            customer_phone_number = latest_insert.get('customerPhoneNumber', 'N/A')
            customer_address = latest_insert.get('customerAddress', 'N/A')
            customer_name = latest_insert.get('customerName', 'N/A')
            customer_time = latest_insert.get('dateAndTime', 'N/A')
            isFinalOrderSubmitted = latest_insert.get('isFinalOrderSubmitted', 'N/A')
            isBistarOrdered = latest_insert.get('isBistarOrdered', 'N/A')
            isTentOrdered = latest_insert.get('isTentOrdered', 'N/A')
            isLightOrdered = latest_insert.get('isLightOrdered', 'N/A')
            isCateringOrdered = latest_insert.get('isCateringOrdered', 'N/A')
            isDecorationOrdered = latest_insert.get('isDecorationOrdered', 'N/A')

            
            # Assuming customer_time is a datetime object or string representation of a datetime
            # If customer_time is already a string, you can skip this step
            customer_time_str = str(customer_time)

            # Parse the date string to a datetime object
            datetime_obj = datetime.datetime.fromisoformat(customer_time_str)

            # Extract only the date part
            date_only = datetime_obj.date()

            # Convert the date back to a string
            date_only_string = date_only.isoformat()
            
            current_time = datetime.datetime.now()

            # Format the time without milliseconds and replace colons with underscores
            formatted_time = current_time.strftime("%H_%M_%S")

            # Check if final order is submitted
            if isFinalOrderSubmitted:
                # List of phone numbers 
                 
                 
                recipients = ["+919506497032", f"+91{customer_phone_number}"]

                # Define the message to be sent
                message = f"Thank You for choosing DG Caters Services!\nYour order has been successfully placed\nCustomer Phone No.-+91{customer_phone_number},\nCustomer Name:-{customer_name},\nCustomer Address:-{customer_address},\nDate:- {customer_time}\nOrder Details:- {'Bistar: YES' if isBistarOrdered else 'Bistar: NO'}, {'Tent: YES' if isTentOrdered else 'Tent: NO'}, {'Light: YES' if isLightOrdered else 'Light: NO'}, {'Catering: YES' if isCateringOrdered else 'Catering: NO'}, {'Decoration: YES' if isDecorationOrdered else 'Decoration: NO'}"

                # File name for the PDF
                file_name = f"{customer_name}_{date_only_string}_{formatted_time}_order_details.pdf"
                image_name = f"{customer_name}_{date_only_string}"

                parent_directory = "C:/Users/blurock/Downloads/"
                subdirectory = "DGCaters_Order"

                directory = os.path.join(parent_directory, subdirectory)

                pdf_file = await create_pdf(message, directory, file_name)

                print(pdf_file)
                
                # Specify the PDF file path and the output directory
               
                output_directory = "C:/Users/blurock/Downloads/DGCaters_Order/image/"

                # Convert the PDF to PNG images
                saved_files = await convert_pdf_to_png(pdf_file, output_directory, image_name)
                print("Saved files:", saved_files)
                
                if pdf_file:
                    print("File saved successfully.")
                    # Loop through each recipient and send the message
                    for recipient in recipients:
                        # Wait for 2 seconds between each message to avoid rate limits
                        time.sleep(2)
                        pw.sendwhats_image(recipient, saved_files, message)
                else:
                    print("Error: PDF file not created.")
            else:
                print("Final order not submitted.")
                
if __name__ == "__main__":
    database_name = "ERP_Solution"
    collection_name = "customers"
    asyncio.run(watch_mongodb(database_name, collection_name))