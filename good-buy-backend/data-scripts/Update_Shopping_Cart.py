import boto3
import json
import os
from dotenv import load_dotenv

load_dotenv()

access_key = os.getenv('AWS_ACCESS_KEY')

secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')

session = boto3.Session(aws_access_key_id = access_key, aws_secret_access_key = secret_access_key, region_name = "us-east-1")

db = session.resource("dynamodb")
table = db.Table("Shopping_Cart")

response = table.update_item(
    Key = {
        'ID' : 6
    },UpdateExpression = "SET cart =:cart",
    ExpressionAttributeValues = {
        ':cart' : [{
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
  },]
    }
)

print(response)