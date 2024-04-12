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
    

    for change in cursor:
        if change["operationType"] == "update":
            latest_insert = collection.find_one(sort=[("_id", -1)])
            id = latest_insert.get('_id', 'N/A')
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
            
            print(isFinalOrderSubmitted, isLightOrdered, isTentOrdered)
            
            #choose catering order
            order_caterings= "caterings"
            # Assuming 'id' contains the specific customer ID you are interested in
            catering_services = db[order_caterings].find_one({"customerId": id})
            if catering_services:
                print(catering_services) 
            else:  
                
                print("No catering services found for the given customer ID.")
                
             #choose tent order
            order_tent= "tent_orders"
            # Assuming 'id' contains the specific customer ID you are interested in
            tent_services = db[order_tent].find_one({"customerId": id})
            if tent_services:
                print(tent_services) 
            else:
                print("No tent services found for the given customer ID.")

             
             
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
                 
                 
                recipients = ["+919506497032","+919873363084", f"+91{customer_phone_number}"]

               # Define the message to be sent
                message = f"Thank You for choosing DG Caters Services!\n\n"
                message += f"Order Details:\n"
                message += f"Customer Name: {customer_name}\n"
                message += f"Phone No.: +91{customer_phone_number}\n"
                message += f"Address: {customer_address}\n"
                message += f"Date: {customer_time}\n\n"
                message += f"Order Services:\n"
                message += f"- Bistar: {'YES' if isBistarOrdered else 'NO'}\n"
                message += f"- Tent: {'YES' if isTentOrdered else 'NO'}\n"
                message += f"- Light: {'YES' if isLightOrdered else 'NO'}\n"
                message += f"- Catering: {'YES' if isCateringOrdered else 'NO'}\n"
                message += f"- Decoration: {'YES' if isDecorationOrdered else 'NO'}"

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