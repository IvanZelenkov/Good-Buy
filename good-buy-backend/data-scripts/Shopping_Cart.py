import boto3
import json
import os
from dotenv import load_dotenv

# if id for cart is null then inject it 
# only carts with id would be users that have made account
# other wise don't 

# if have account cart and user are the same
# if not they are different

load_dotenv()

access_key = os.getenv('AWS_ACCESS_KEY')

secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')

session = boto3.Session(aws_access_key_id = access_key, aws_secret_access_key = secret_access_key, region_name = "us-east-1")

db = session.resource("dynamodb")
table = db.Table("Shopping_Cart")

response = table.put_item(
    Item={
        "ID": int("3"),
        "cart": [
            {
                "ID": "84989861",
                "Name": "Skittles",
                "image_url": "unique_url",
                "color": "N/A",
                "store_name": "Rouses",
                "price": "1.8",
                "brand": "N/A",
                "store_link": "https://www.rouses.com/shop",
                "store_location": "4001 General Degaulle Dr, New Orleans",
                "rating": "4.2"
            },
            {
                "ID": "85926348",
                "Name": "MnMs",
                "image_url": "unique_url",
                "color": "N/A",
                "store_name": "Walmart",
                "price": "4.8",
                "brand": "N/A",
                "store_link": "https://www.walmart.com/",
                "store_location": "4001 Behrman Pl, New Orleans",
                "rating": "3.9"
            },
            {
                "ID": "51530799",
                "Name": "MnMs",
                "image_url": "unique_url",
                "color": "N/A",
                "store_name": "Walmart",
                "price": "6.4",
                "brand": "N/A",
                "store_link": "https://www.walmart.com/",
                "store_location": "8101 W Judge Perez Dr, Chalmette",
                "rating": "4.5"
            },
            {
                "ID": "23876787",
                "Name": "Kit Kat",
                "image_url": "unique_url",
                "color": "N/A",
                "store_name": "Rouses",
                "price": "5.4",
                "brand": "N/A",
                "store_link": "https://www.rouses.com/shop",
                "store_location": "701 Baronne St, New Orleans",
                "rating": "1.8"
            },
            {
                "ID": "2921007",
                "Name": "Ring Pop",
                "image_url": "unique_url",
                "color": "N/A",
                "store_name": "Winn-Dixie",
                "price": "3.9",
                "brand": "N/A",
                "store_link": "https://shop.winndixie.com/shop/",
                "store_location": "5400 Tchoupitoulas St, New Orleans",
                "rating": "2.0"
            },
        ],
    },
)

print(response)