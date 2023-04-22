import json
import random
"""

"ID": "416520",
		"Name": "Hersheys kiss",
  		"image_url": "unique_url",
  		"color": "N/A" ,
  		"store_name": "Winn-Dixie",
  		"price": "5.2",
  		"brand": "N/A",
  		"store_link": "https://shop.winndixie.com/shop/",
  		"store_location": "211 Veterans Memorial Blcd, Metairie" ,
  		"rating": "3.8"
"""
storelist = ["Walmart", "Rouses", "Winn-Dixie"]
namelist = ["Hersheys kiss", "Skittles", "MnMs", "Tootsie-Roll",
					"Candy Cane", "Twix", "Snickers", "Kit Kat", "Three Musketeers",
					"Ring Pop"]
winndixxie_addresses = ["5400 Tchoupitoulas St, New Orleans",
						"3008 Holiday Dr, New Orleans" 
						"211 Veterans Memorial Blcd Metairie"
						"9701 Chef Menteur Hwy, New Orleans"]

walmart_addresses = ["6000 Bullard Ave, New Orleans",
					"1901 Tchoupitoulas St, New Orleans",
					"4301 Chef Menteur Hwy, New Orleans",
					"8101 W Judge Perez Dr, Chalmette",
					"4001 Behrman Pl, New Orleans"]

rouses_addresses = ["6600 Franklin Ave, New Orleans",
					"701 Baronne St, New Orleans",
					"4001 General Degaulle Dr, New Orleans",
					"4500 Tchoupitoulas St, New Orleans",
					"400 N Carrolton Ave, New Orleans"]



imagelist = ["hersheys.png",
            "skittles.png",
            "mnms.png",
            "tootsie.png",
            "candycane.png",
            "twix.png",
            "snickers.png",
            "kitkat.png",
            "threemusket.png",
            "ringpop.png"]


brandlist = ["HERSHEYS", "Skittles (MARS)", "M&Ms (MARS)", "Tootsie-Roll Industries",
					"Brach", "TWIX", "Snickers (MARS)", "Kit-Kat (HERSHEYS)", "Three Musketeers (MARS)",
					"Ring Pop"]

		#storelist = ["Walmart", "Rouses","Winn-Dixie"]
		#store = random.choice(storelist)
		#Pick a specific store now

        #Better would be taking in a url, and grabbing a hex color based on the image

        #Hex

jsonlist = []
for i in range(3):
	store = storelist[i]

	for j in range(30):
		randomID = random.randint(0,99999999)
		randomnumberindex = random.randint(0, len(imagelist)-1)
		randomname = namelist[randomnumberindex]
		productimage = imagelist[randomnumberindex]
		randomprice = random.randint(1,4)
		randomrating = round(random.uniform(0,5),1)
		availability = bool(random.getrandbits(1))
		clearance = bool(random.getrandbits(1))
		onsale = bool(random.getrandbits(1))
		brand = brandlist[randomnumberindex]
		url = ""
		address = ""
		if storelist[i] == "Walmart":#Make sure you assign an address and url to a matching store
			address = random.choice(walmart_addresses)
			url = "https://www.walmart.com/"
		if storelist[i] == "Rouses":
			address = random.choice(rouses_addresses)
			url = "https://www.rouses.com/shop"
		if storelist[i] == "Winn-Dixie":
			address = random.choice(winndixxie_addresses)
			url = "https://shop.winndixie.com/shop/"

		my_dict = {}

		my_dict["ID"] = str(randomID)
		my_dict["Name"] = randomname
		my_dict["image_url"] = productimage
		my_dict["category"] = "Candy"
		my_dict["availability"] = availability
		my_dict["on_clearance"] = clearance
		my_dict["on_sale"] = onsale
		my_dict["brand"] = brand
		my_dict["store_name"] = storelist[i]
		my_dict["price"] = randomprice
		my_dict["brand"] = "N/A"
		my_dict["store_link"] = url
		my_dict["store_location"] = address
		my_dict["rating"] = randomrating

		#Now append this entry into the list:
		jsonlist.append(my_dict)
	#Now that one array of jsons are done, do one file:
	jsonString = json.dumps(jsonlist, indent = 4)
	jsonlist = []#Make sure to do this, so the list is empty for the next cycle

	filename = "myNewJson" + str(i) + ".json"

	with open(filename, "w") as outfile:
		outfile.write(jsonString)


"""
An example chatgpt have me for how to do the above code
# Initialize an empty list to hold the dictionaries
my_list_of_dicts = []

# Define the number of dictionaries and keys for each dictionary
num_dicts = 3
keys = ['name', 'age', 'gender']

# Use a for loop to create the dictionaries and add them to the list
for i in range(num_dicts):
    # Create a new dictionary
    my_dict = {}
    
    # Add values to the dictionary
    my_dict['name'] = input("What's your name?")
    my_dict['age'] = input("How old are you?")
    my_dict['gender'] = input("What's your gender?")
    
    # Add the dictionary to the list
    my_list_of_dicts.append(my_dict)

# Print the list of dictionaries
print(my_list_of_dicts)
"""