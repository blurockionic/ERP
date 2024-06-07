import pymongo
from datetime import datetime, timedelta, timezone
import schedule
import time
import pywhatkit as pw

try:
    client = pymongo.MongoClient("mongodb+srv://biruly:Biruly23@dgbshop.l4tbibb.mongodb.net/")
    client.admin.command('ping')
    print("MongoDB connection successful.")
except Exception as e:
    print("MongoDB connection failed:", e)
    exit()

db_name = "ERP_Solution"  # database name
collection_name = "orders"  #  collection name

db = client[db_name]
collection = db[collection_name]

print(f"Watching MongoDB collection '{collection_name}' for changes....")

def check_events():
    # Get the current UTC time
    now = datetime.now(timezone.utc)
    # Calculate the target date (3 days from now)
    target_date = datetime.now(timezone.utc) + timedelta(days=3)

    # Find events happening on the target date
    events = collection.find({
        "dateAndTime": {
            "$gte": target_date
        }
    })
    
    # events = collection.find({
    #     "dateAndTime": {
    #         "$gte": target_date,
    #         "$lt": target_date + timedelta(days=1)
    #     }
    # })


    
    event_list = list(events)
    print(f"Found {len(event_list)} events.")
    
    
    for event in event_list:
        # print(f"Sent reminder for event '{event}'")
        send_reminder(event)



def send_reminder(event):
    event_name = event["customerName"]
    event_date = event["dateAndTime"]
    # customer_phone_number = event["customerPhone"]
    
    combined_message = f"Reminder: The event '{event_name}' is happening on {event_date.strftime('%d-%m-%Y')}."
    
    # recipients = ["+916200932331", f"+91{customer_phone_number}"]
    recipients = ["+916200932331"]
    
    for recipient in recipients:
         # Wait for 2 seconds between each message to avoid rate limits
        time.sleep(2)
        pw.sendwhatmsg_instantly(recipient, combined_message)

# Schedule the task to run daily at 3:15 AM
# schedule.every().day.at("04:24").do(check_events)
schedule.every(1).minute.do(check_events)

try:
    # Keep the script running
    while True:
        schedule.run_pending()
        time.sleep(1)
except KeyboardInterrupt:
    print("Script terminated by user. Exiting...")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    # Close the MongoDB connection
    client.close()
