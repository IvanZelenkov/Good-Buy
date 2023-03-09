import random


print ("hello its me")

# loop  
for (i = 1; i <= 30; i++)
	## .json
	nameoffile = "myFile" + str(i) + ".json"
	f = open(nameoffile , "x") # generates a file, need add some sort of concat count to end for new file
	#
	## {  
	f.write("{\n")
	## "product" : {
	#
	##  "id": "unique_8_char_string",
	number = random.randint(0,99999999) 
	## make a list, put this number in list, check list, redo if same
	## if we do generate 9 mil this soltuion is slow
	f.write("  \"ID\":{\n    \"N\":\"" + str(number) + "\"" + "\n  },\n")
	#
	#
	#
	##  "name":"unique",
	namelist = ["Hersheys kiss", "Skittles", "MnMs", "Tootsie-Roll",
				"Candy Cane", "Twix", "Snickers", "Kit Kat", "Three Musketeers",
				"Ring Pop"]
	
	randomname = random.choice(namelist)

	f.write("  \"Name\":{\n    \"S\":\"" + randomname + "\"" + "\n  },\n")





	##  "image_url": "unique_url",
	f.write("  \"image_url\":{\n    \"S\":\"" + "unique_url" + "\"" + "\n  },\n")

	## generating a unique url big sadge






	##  "color": "a_color",
	## Not applicable to candy

	f.write("  \"color\":{\n    \"S\":\"" + "N/A" + "\"" + "\n  },\n")
	



	## "store_name" : "name_of_store", 
	storelist = ["Walmart", "Rouses","Winn-Dixie"]

	store = random.choice(storelist)


	f.write("  \"store_name\":{\n    \"S\":\"" + store + "\"" + "\n  },\n")




	## "price": "a_decimal",

	randomprice = random.randint(1,4)


	if store == "Walmart":
		randomprice *= 1.6
		url = "https://www.walmart.com/"
		address = linecache.getline(Walmarts, randint(1,5))
	elif store == "Rouses":
		randomprice *= 1.8
		url = "https://www.rouses.com/shop"
		address = linecache.getline(Rouses, randint(1,4))
	elif store == "Winn-Dixie":
		randomprice *= 1.3
		url = "https://shop.winndixie.com/shop/"
		address = linecache.getline(WinnDixies, randint(1,5))

	randomprice = round(randomprice,2)

	f.write("  \"price\":{\n    \"N\":\"" + str(randomprice) + "\"" + "\n  },\n")





	##  "brand": "a_brand", 
	##  Not applicable to candy

	f.write("  \"brand\":{\n    \"S\":\"" + "N/A" + "\"" + "\n  },\n")

	##  "link" : "website_link",


	f.write("  \"store_link\":{\n    \"S\":\"" + url+ "\"" + "\n  },\n")


	##  "store_location" : "location_of_store", 



	f.write("  \"store_location\":{\n    \"S\":\"" + address+ "\"" + "\n  },\n")
	##  "rating" : "object_quality_rating"}


	randomrating = round(random.uniform(0,5),1)


	f.write("  \"rating\":{\n    \"N\":\"" + str(randomrating)+ "\"" + "\n  }\n}")

	##}



f.close()

