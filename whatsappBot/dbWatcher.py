import pymongo
from selenium import webdriver



from selenium.webdriver.chrome.options import Options
import time

def watch_mongodb(db_name, collection_name):
    try:
      client = pymongo.MongoClient("mongodb+srv://biruly:Biruly23@dgbshop.l4tbibb.mongodb.net/")
      client.admin.command('ping')
      print("MongoDB connection successful.")
    except Exception as e:
      print("MongoDB connection failed:", e)

    db = client[db_name]
    collection = db[collection_name]

    #initialize a cursor for watching changes in the collection
    cursor =  collection.watch()

    print(f"Watching Mongo db collection '{collection_name}' for changes....")

    #continuously moniter changes
    for change in cursor:
        #check if he change is an insert operation
        if change["operationType"] == "insert":
            #send message via whatsapp
            send_whatsapp_message(change["fullDocument"])


def send_whatsapp_message(message):

     # Initialize Chrome WebDriver options
    chrome_options = Options()
    # Set any desired browser capabilities
    chrome_options.add_argument("--headless") 

    #initialize selenium webdriver (make sure to provide path to your chromedriver.exe)
    driver = webdriver.Chrome("./chromedriver.exe")

    #open whatsapp web
    driver.get("https://web.whatsapp.com/")

    #wait for user to scan OR code
    input("Press enter after scanning or code")

    #locate the search bar
    search_box = driver.find_element_by_xpath('//div[@class="_3FRCZ copyable-text selectable-text"][@contenteditable="true"][@data-tab="3"]')

    #search for the contact or group to whom you want to send the message
    search_box.send_keys("Arun Sd"+ Keys.ENTER)  #replace "Recipeint's Name" with the actual name

    #wait for the chat to load
    time.sleep(2)

    # Find the input field for typing message
    input_box = driver.find_element_by_xpath('//div[@class="_3FRCZ copyable-text selectable-text"][@contenteditable="true"][@data-tab="1"]')
    
    # Type and send the message
    input_box.send_keys(message + Keys.ENTER)
    
    # Wait for a while to let the message send
    time.sleep(2)
    
    # Close the browser
    driver.quit()

if __name__ == "__main__":
    #specify the miongodb database name anc colloection name to watch
    database_name = "ERP_Solution"
    collection_name = "customers"

    #start watching Mongodb for changes
    watch_mongodb(database_name, collection_name)