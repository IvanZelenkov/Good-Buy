import boto3
import json

access_key = "AKIA6JEHZ62JD2DQYATL"

secret_access_key = "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"

session = boto3.Session(aws_access_key_id = access_key, aws_secret_access_key = secret_access_key, region_name = "us-east-1")

db = session.resource("dynamodb")
table = db.Table("Users")

response = table.put_item(
    Item={
        "ID": int("1"),
        "username": "DustinBell",
        "password": "1234",
        "email": "dustin@gmail.com",
        "phone": "1111111111",
    },
)

print(response)