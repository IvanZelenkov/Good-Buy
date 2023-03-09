import uuid
import random 
import linecache
import string
from random_username.generate import generate_username
print ("Generating User...")



emails = ["@gmail.com", "@yahoo.com", "@aol.com", "@Outlook.com", "@Hotmail.com"]



# UserID
randomUserID = str(uuid.uuid4())
f = open("ExampleUser.json" , "w") 



# Username
randomUsernameList = generate_username(2)
randomUsername = randomUsernameList[0]



#phone #[504]-898-9000
phoneNum = "["
randomnum = 0
while(len(phoneNum) < 14):
	if(len(phoneNum) == 4):
		phoneNum += "]"
		phoneNum += "-"
	elif(len(phoneNum) == 10):
		phoneNum += "-"
	else:
		randomnum = random.randint(0,9)
		phoneNum += str(randomnum) 



# pass
letters = string.ascii_lowercase
password = ''.join(random.choice(letters) for i in range(20))


#email
ranmdomemail = randomUsernameList[1] + random.choice(emails)


#id

f.write("{\n")
f.write("  \"ID\": \"" +randomUserID+ "\",\n") #Example with comma
f.write("  \"Username\": \"" +randomUsername+ "\",\n") #Example with comma
f.write("  \"PhoneNumber\": \"" + phoneNum + "\",\n") #Example with comma
f.write("  \"Password\": \"" + password + "\",\n") #Example with comma
f.write("  \"E-mail\": \"" + ranmdomemail + "\"\n") #Example with comma
f.write("}")
f.close()
