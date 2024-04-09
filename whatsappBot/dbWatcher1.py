import asyncio
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.chrome.options import Options
import pymongo
import pywhatkit
import time
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


#send message to whatsapp
async def send_whatsapp_message(message):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_driver_path = "C:/Users/blurock/Downloads/chromedriver.exe"
    try:
        service = Service(chrome_driver_path)
        service.start()
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get("https://web.whatsapp.com/")
        input("Press enter after scanning QR code")
        search_box = driver.find_element_by_xpath('//div[@class="_3FRCZ copyable-text selectable-text"][@contenteditable="true"][@data-tab="3"]')
        search_box.send_keys("Arun Sd" + Keys.ENTER)
        time.sleep(2)
        input_box = driver.find_element_by_xpath('//div[@class="_3FRCZ copyable-text selectable-text"][@contenteditable="true"][@data-tab="1"]')
        input_box.send_keys(message + Keys.ENTER)
        time.sleep(2)
        driver.quit()
    except Exception as e:
        print("Error occurred:", str(e))

#send convert information into pdf
async def create_pdf(message, file_name):
    # Create a canvas object
    c = canvas.Canvas(file_name, pagesize=letter)
    
    # Set font and size
    c.setFont("Helvetica", 12)
    
    # Split the message into lines
    lines = message.split('\n')
    
    # Write the lines to the PDF
    y = 750  # Starting y-coordinate
    for line in lines:
        c.drawString(50, y, line)
        y -= 15  # Move to the next line
    
    # Save the PDF
    c.save()

#send message with pywhatkit
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
                # Remove leading zero if present
                if len(customer_phone_number) == 11 and customer_phone_number.startswith("0"):
                    
                    # Define the phone number of the recipient (individual or group)
                    customer_phone_number = customer_phone_number[1:]
                    
                    # List of phone numbers
                    recipients = ["+919506497032", f"+91{customer_phone_number}"]
                
                    # Define the message to be sent
                    message = f"Thank You for choosing DG Caters Services!\nYour order has been successfully placed\nCustomer Phone No.-+91{customer_phone_number},\nCustomer Name:-{customer_name},\nCustomer Address:-{customer_address},\nDate:- {customer_time}\nOrder Details:- {'Bistar: YES' if isBistarOrdered else 'Bistar: NO'}, {'Tent: YES' if isTentOrdered else 'Tent: NO'}, {'Light: YES' if isLightOrdered else 'Light: NO'}, {'Catering: YES' if isCateringOrdered else 'Catering: NO'}, {'Decoration: YES' if isDecorationOrdered else 'Decoration: NO'}"

                    # File name for the PDF
                    file_name = f"{customer_name}_order_details.pdf"
                    
                    print(file_name)

                    # Create the PDF
                    await create_pdf(message, file_name)
                    
                    # Loop through each recipient and send the message
                    for recipient in recipients:
                        # Wait for 2 seconds between each message to avoid rate limits
                        time.sleep(2)
                        pywhatkit.sendwhatmsg_instantly(recipient, message)  # Send the message
                    
                    
if __name__ == "__main__":
    database_name = "ERP_Solution"
    collection_name = "customers"
    asyncio.run(watch_mongodb(database_name, collection_name))
