"""
    This Script contains the generate Empty Cart JSON
    Example 
    {
        ID: beepboop@beep.com
        cart: []
    }

"""

import json

def generateEmptyCartWithUSERID(email):
    """
        This is the function for an empty cart, takes in a email address (String)
    """
    my_dict = {"ID": "", "cart": []}
    my_dict.update({"ID": email})
    jsonString = json.dumps(my_dict, indent = 4)
    filename = "ShoppingCart_" + email + ".json"
    with open(filename, "w") as outfile:
        outfile.write(jsonString)
