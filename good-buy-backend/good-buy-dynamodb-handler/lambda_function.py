import json
import boto3
import os
# from dotenv import load_dotenv

# load_dotenv()

    # "resource":"/database/shopping-cart",
    # "path":"/database/shopping-cart",
    # "httpMethod":"GET",
    # shopping cart has an ID so have an ID parameter
    # if event['path'] == '/database/shopping-cart' or have a variable with this value

# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('Users')

access_key = os.getenv('ACCESS_KEY')

secret_access_key = os.getenv('SECRET_ACCESS_KEY')

session = boto3.Session(aws_access_key_id = access_key, aws_secret_access_key = secret_access_key, region_name = "us-east-1")

db = session.resource("dynamodb")




def lambda_handler(event, context):
    if event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'GET':
        table = db.Table("Shopping_Car")
        print(event['queryStringParameters']['ID'])
        IDvalue = event['queryStringParameters']['ID']
        response = table.get_item(
            Key = {
                'ID': int(IDvalue)
            }
        )
        print(response['Item']['cart'])
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item']['cart'], indent=2,default=str)
        }

    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'GET':
        table = db.Table("Users")
        print(event['queryStringParameters']['ID'])
        IDvalue = event['queryStringParameters']['ID']
        response = table.get_item(
            Key = {
                'ID': int(IDvalue)
            }
        )
        print(response['Item'])
        return {
            'statusCode': 200,
            'body': json.dumps(response, indent=2,default=str)
        }

    elif event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'POST':
        table = db.Table("Shopping_Cart")
        print(event)
    # items = json.dumps(response)
    # print(items)
    

    # 'body': json.dumps('good-buy-dynamodb-handler is working')
