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

response = table.update_item(
    Key = {
        'ID' : 2
    },UpdateExpression = "SET phone =:phone",
    ExpressionAttributeValues = {
        # ':cart' : int("1")
        ':phone' : '2222222222'
        # ':password': '1234'
    }
)

print(response)