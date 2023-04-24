"""
    This Script will add to a cart specified with userID
    Example 
    {
        ID: beepboop@beep.com
        cart: [{
        "color": "N/A",
        "image_url": "unique_url",
        "price": "3.6",
        "store_link": "https://www.rouses.com/shop",
        "rating": "4.7",
        "store_name": "Rouses",
        "ID": "70252983",
        "brand": "N/A",
        "store_location": "701 Baronne St, New Orleans",
        "Name": "Hersheys kiss"
    }]
    }

"""
import json
from os import path


def addToCartJSON(email, filename, products):
    """
        This is the function for an empty cart, takes in a email address (String)
    """
    filefound = False
    def checkfile():
        """
            Check if the file is reachable
            Return boolean if file was found
        """
        if email in filename is False:
            raise Exception("File not found")

        if path.isfile(filename) is False:
            raise Exception("File not found")

    def run():
        """
            Run the program
        """
        with open(filename) as fp:
            listObj = json.load(fp)

        listObj["cart"].append(products)

        with open(filename, "w") as json_file:
                    json.dump(listObj, json_file, indent = 4, separators = (',',': '))

    # Test if file is found, run if it is
    checkfile()
    run()
    
