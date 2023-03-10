import random
import linecache
print("Generating data....")

firstrun = True
lastrun = False

amountofjsons = 30
f = open("testfile.txt" , "w") # generates a file, need add some sort of concat count to end for new file
f.write("{\n")
f.write("  \"productjsons\": [\n")
#we want to open the file outside of the loop instead
for i in range(amountofjsons):
	if i == amountofjsons -1:
		lastrun = True


	randomID = random.randint(0,99999999)

	namelist = ["Hersheys kiss", "Skittles", "MnMs", "Tootsie-Roll",
				"Candy Cane", "Twix", "Snickers", "Kit Kat", "Three Musketeers",
				"Ring Pop"]	
	randomname = random.choice(namelist)

	storelist = ["Walmart", "Rouses","Winn-Dixie"]
	store = random.choice(storelist)


	randomprice = random.randint(1,4)


	if store == "Walmart":
		randomprice *= 1.6
		url = "https://www.walmart.com/"
		address = linecache.getline("Walmarts.txt", random.randint(1,5))
	elif store == "Rouses":
		randomprice *= 1.8
		url = "https://www.rouses.com/shop"
		address = linecache.getline("Rouses.txt", random.randint(1,4))
	elif store == "Winn-Dixie":
		randomprice *= 1.3
		url = "https://shop.winndixie.com/shop/"
		address = linecache.getline("WinnDixies.txt", random.randint(1,5))

	randomprice = round(randomprice,2)

	randomrating = round(random.uniform(0,5),1)

	f.write("    {\n")
	#f.write("      \"ID\": \"" +str(randomID)+ "\"\n") # Last one cant contain a comma, dont forget
	f.write("      \"ID\": \"" +str(randomID)+ "\",\n") #Example with comma

	#write name
	f.write("		\"Name\": \"" + randomname + "\",\n")
	#write image url
	f.write("  		\"image_url\": \"" + "unique_url" + "\",\n")
	#write color
	f.write("  		\"color\": \"" + "N/A" + "\" ,\n")
	#write store name
	f.write("  		\"store_name\": \"" + store + "\",\n")
	#write price
	f.write("  		\"price\": \"" + str(randomprice) + "\",\n")
	#write brand
	f.write("  		\"brand\": \"" + "N/A" + "\",\n")
	#write store link
	f.write("  		\"store_link\": \"" + url+ "\",\n")
	#write store location
	f.write("  		\"store_location\": \"" + address.strip("\n")+ "\" ,\n")
	#write rating, this one needs an if else since it will be the last any may or may not need a comma
	f.write("  		\"rating\": \"" + str(randomrating)+ "\"\n")#If the last iteration, no comma
	if lastrun == False:
		f.write("    },\n")
		firstrun = False
	elif lastrun:
		f.write("    }\n")

	

f.write("  ]\n")
f.write("}")





f.close()
