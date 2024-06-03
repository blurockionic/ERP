import pymongo
from datetime import datetime, timedelta
import schedule
import time

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

cursor = collection.watch()

print(f"Watching MongoDB collection '{collection_name}' for changes....")

def check_events():
    # Calculate the target date (3 days from now)
    target_date = datetime.utcnow() + timedelta(days=3)
    # Remove the time part for comparison
    target_date = target_date.replace(hour=0, minute=0, second=0, microsecond=0)

    # Find events happening on the target date
    events = collection.find({
        "dateAndTime": {
            "$gte": target_date,
            "$lt": target_date + timedelta(days=1)
        }
    })
    
    print(events)

    for event in events:
        send_reminder(event)

def send_reminder(event):
    event_name = event["customerName"]
    event_date = event["dateAndTime"]
    print(f"Reminder: The event '{event_name}' is happening on {event_date}.")

# Schedule the task to run daily at 3:15 AM
schedule.every().day.at("04:24").do(check_events)

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
