import asyncio
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.chrome.options import Options
import pymongo
import pywhatkit
import time

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
        if change["operationType"] == "insert":
            latest_insert = collection.find_one(sort=[("_id", -1)])
            customer_phone_number = latest_insert.get('customerPhoneNumber', 'N/A')
            customer_address = latest_insert.get('customerAddress', 'N/A')
            customer_name = latest_insert.get('customerName', 'N/A')
            customer_time = latest_insert.get('dateAndTime', 'N/A')
            #remove zero from phone number 
            phone_number_without_zero = customer_phone_number[1:]
            pywhatkit.sendwhatmsg_instantly(f"+91{phone_number_without_zero}", f"Thank You for choosing DG Caters Services!\nYour order has been successfully placed\nCustomer Phone No.-+91{phone_number_without_zero},\nCustomer Name:-{customer_name},\nCustomer Address:-{customer_address},\nDate:- {customer_time}")
                                                                                                                                                                                                                                              

            # await send_whatsapp_message(change["fullDocument"])

if __name__ == "__main__":
    database_name = "ERP_Solution"
    collection_name = "customers"
    asyncio.run(watch_mongodb(database_name, collection_name))
