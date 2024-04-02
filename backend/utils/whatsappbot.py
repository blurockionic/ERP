from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import csv 

driver = webdriver.Chrome()
baseurl = "https://web.whatsapp.com/"
driver.get(baseurl)

time.sleep(10)  

with open("contact.csv", newline='') as csvfile:
    readContacts = csv.reader(csvfile)
    for phone, msg in readContacts:
        phonenum = phone.strip()  # Ensure no leading/trailing spaces
        message = msg.strip()     # Ensure no leading/trailing spaces
        # print(phonenum, message)

        # Format phone number properly
        phonenum = phonenum.replace('+', '').replace(' ', '')
        # print(phonenum)
        # Construct URL
        sameTab = f"{baseurl}send?phone={phonenum}"
        driver.get(sameTab)

        time.sleep(8)

        # Switching to the input field
        content = driver.switch_to.active_element

        # Sending message
        content.send_keys(message)
        content.send_keys(Keys.RETURN)

        time.sleep(8)

# Close the driver
# driver.quit()
