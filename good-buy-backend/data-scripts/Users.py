import boto3
import json
import os
from dotenv import load_dotenv

load_dotenv()

access_key = os.getenv('AWS_ACCESS_KEY')

secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')

session = boto3.Session(aws_access_key_id = access_key, aws_secret_access_key = secret_access_key, region_name = "us-east-1")

db = session.resource("dynamodb")
table = db.Table("Users")

response = table.put_item(
    Item={
        "ID": int("4"),
        "username": "MathewO",
        "password": "1234",
        "email": "mathewo@gmail.com",
        "phone": "5041234567",
    },
)

print(response)