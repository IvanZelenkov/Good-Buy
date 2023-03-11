import boto3
import json

access_key = "AKIA6JEHZ62JD2DQYATL"

secret_access_key = "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"

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