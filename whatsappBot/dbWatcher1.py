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




#send convert information into pdf
async def create_pdf(text, directory, filename):
    # Ensure the directory exists, create it if it doesn't
    os.makedirs(directory, exist_ok=True)

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


# Function to send PDF via WhatsApp
async def send_pdf_whatsapp(pdf_file, recipients):
    # Open WhatsApp Web
    pw.open_web()

    # Wait for WhatsApp Web to open
    time.sleep(5)

    # Iterate through each recipient
    for recipient in recipients:
        # Type recipient's name
        pw.typewrite(recipient)
        time.sleep(2)
        pw.press('enter')
        time.sleep(2)

        # Attach file
        pw.press('/')
        time.sleep(2)
        pw.typewrite(pdf_file)
        time.sleep(2)
        pw.press('enter')
        time.sleep(2)

        # Send message
        pw.typewrite('Sending PDF file...')
        time.sleep(2)
        pw.press('enter')
        time.sleep(2)

# function for watch the db 
async def watch_mongodb(db_name, collection_name):
    try:
        client = pymongo.MongoClient("mongodb+srv://biruly:Biruly23@dgbshop.l4tbibb.mongodb.net/")
        client.admin.command('ping')
        print("MongoDB connection successful.")
    except Exception as e:
        print("MongoDB connection failed:", e)

    db = client[db_name]
    collection = db[collection_name]

    cursor = collection.watch()

    print(f"Watching Mongo db collection '{collection_name}' for changes....")

    for change in cursor:
        if change["operationType"] == "update":
            latest_insert = collection.find_one(sort=[("_id", -1)])
            customer_phone_number = latest_insert.get('customerPhoneNumber', 'N/A')
            customer_address = latest_insert.get('customerAddress', 'N/A')
            customer_name = latest_insert.get('customerName', 'N/A')
            customer_time = latest_insert.get('dateAndTime', 'N/A')
            isFinalOrderSubmited = latest_insert.get('isFinalOrderSubmited', 'N/A')
            isBistarOrdered = latest_insert.get('isBistarOrdered', 'N/A')
            isTentOrdered = latest_insert.get('isTentOrdered', 'N/A')
            isLightOrdered = latest_insert.get('isLightOrdered', 'N/A')
            isCateringOrdered = latest_insert.get('isCateringOrdered', 'N/A')
            isDecorationOrdered = latest_insert.get('isDecorationOrdered', 'N/A')

            print(isBistarOrdered, isTentOrdered, isLightOrdered, isCateringOrdered, isDecorationOrdered, isFinalOrderSubmited)

            # Check if final order is submitted
            if isFinalOrderSubmited:  
                # List of phone numbers
                recipients = ["+919506497032", f"+91{customer_phone_number}"]
                
                # Define the message to be sent
                message = f"Thank You for choosing DG Caters Services!\nYour order has been successfully placed\nCustomer Phone No.-+91{customer_phone_number},\nCustomer Name:-{customer_name},\nCustomer Address:-{customer_address},\nDate:- {customer_time}\nOrder Details:- {'Bistar: YES' if isBistarOrdered else 'Bistar: NO'}, {'Tent: YES' if isTentOrdered else 'Tent: NO'}, {'Light: YES' if isLightOrdered else 'Light: NO'}, {'Catering: YES' if isCateringOrdered else 'Catering: NO'}, {'Decoration: YES' if isDecorationOrdered else 'Decoration: NO'}"

                # File name for the PDF
                file_name = f"{customer_name}_{customer_time}_order_details.pdf"
                    
                print(file_name)
                
                parent_directory = "C:/Users/blurock/Downloads/"
                subdirectory = "DGCaters_Order"
                
                directory = os.path.join(parent_directory, subdirectory)
                
                pdf_file = await create_pdf(message, directory, file_name)
                
                print(f"PDF saved to: {pdf_file}")
    
                if os.path.exists(pdf_file):
                    print("File saved successfully.")
                else:
                    print("Error: File not saved.")
                    
                
                # send send_whatsapp_message
                # await send_pdf_whatsapp(pdf_file, recipients)
                
                # Convert PDF to image
                # image_file = file_path[:-3] + "png"
                # pywhatkit.from_pdf(file_path, image_file)
                
                #  # Wait for the image file to be generated
                # while not os.path.exists(image_file):
                #     await asyncio.sleep(1)      
                                            
                # Loop through each recipient and send the message
                for recipient in recipients:
                    # Wait for 2 seconds between each message to avoid rate limits
                    time.sleep(2)
                    pw.sendwhats_image(recipient, pdf_file, message)
                    
if __name__ == "__main__":
    database_name = "ERP_Solution"
    collection_name = "customers"
    asyncio.run(watch_mongodb(database_name, collection_name))