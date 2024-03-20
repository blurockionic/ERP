from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import StaleElementReferenceException
import time

# List of recipients and messages
recipients = ["916200932331", "917070117405"]  # Add recipients' phone numbers
message = "Hello biruly"

# Path to the webdriver
webdriver_path = 'C:/Users/blurock/Downloads/chromedriver.exe'

# Initialize the WebDriver
driver = webdriver.Chrome()

driver.get("https://web.whatsapp.com/")
time.sleep(10)  # Allow time for manual login through QR code

# Function to send message to each recipient
def send_message(recipient, message):
    search_box = driver.find_element_by_xpath('//div[@contenteditable="true"][@data-tab="3"]')
    search_box.clear()
    search_box.send_keys(recipient)
    time.sleep(2)
    search_box.send_keys(Keys.ENTER)

    input_box = driver.find_element_by_xpath('//div[@contenteditable="true"][@data-tab="1"]')
    input_box.send_keys(message)
    time.sleep(1)
    input_box.send_keys(Keys.ENTER)

# Loop through each recipient and send message
for recipient in recipients:
    try:
        send_message(recipient, message)
    except StaleElementReferenceException:
        print("Element reference is stale. Refreshing...")
        driver.refresh()
        time.sleep(10)  # Wait for the page to load again
        send_message(recipient, message)  # Retry sending message after refreshing
    except Exception as e:
        print(f"An error occurred while sending message to {recipient}: {e}")

# Close the browser window
driver.quit()
