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
    print(event)
    if event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'GET':
        table = db.Table("Shopping_Cart")
        # print(event['queryStringParameters']['ID'])
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
        # print(event['queryStringParameters']['ID'])
        IDvalue = event['queryStringParameters']['ID']
        response = table.get_item(
            Key = {
                'ID': int(IDvalue)
            }
        )
        # print(response['Item'])
        return {
            'statusCode': 200,
            'body': json.dumps(response, indent=2,default=str)
        }

    elif event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'POST':
        table = db.Table("Shopping_Cart")
        decodedEvent = json.loads(event['body'])
        response = table.put_item(
            Item ={
                'ID': int(decodedEvent['ID']),
                'cart': decodedEvent['cart']
            }
        )
        # print(event['body'])
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Created new shopping cart'
        }
    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'POST':
        table = db.Table("Users")
        decodedEvent = json.loads(event['body'])
        response = table.put_item(
            Item ={
                'ID': int(decodedEvent['ID']),
                'email': decodedEvent['email'],
                'password': decodedEvent['password'],
                'phone': decodedEvent['phone'],
                'username': decodedEvent['username']
            }
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Created new user account'
        }

    # Idea for updating cart
    # When an item is added or removed from the cart, it should send body data of the updated cart.
    # Then retrieve that body data to update it with. 
    elif event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'PUT':
        
        table = db.Table("Shopping_Cart")
        IDvalue = event['queryStringParameters']['ID']
        decodedEvent = json.loads(event['body'])
        
        response = table.update_item(
            Key = {
                'ID' : int(IDvalue)
            },
            UpdateExpression = "SET cart =:cart",
            ExpressionAttributeValues = {
                ':cart' : decodedEvent['cart']
            }
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Updated a shopping cart'
        }

    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'PUT':
        
        table = db.Table("Users")
        IDvalue = event['queryStringParameters']['ID']
        decodedEvent = json.loads(event['body'])
        
        response = table.update_item(
            Key = {
                'ID' : int(IDvalue)
            },
            UpdateExpression = "SET password = :password, phone = :phone, username = :username",
            ExpressionAttributeValues = {
                ':password' : decodedEvent['password'],
                ':phone' : decodedEvent['phone'],
                ':username': decodedEvent['username']
            }
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Updated a user account'
        }

    elif event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'DELETE':
        table = db.Table("Shopping_Cart")
        IDvalue = event['queryStringParameters']['ID']
        
        response = table.delete_item(
            Key = {
                'ID' : int(IDvalue)
            }
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Deleted a shopping cart'
        }

    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'DELETE':
        table = db.Table("Users")
        IDvalue = event['queryStringParameters']['ID']
        
        response = table.delete_item(
            Key = {
                'ID' : int(IDvalue)
            }
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Deleted a user account'
        }


    # items = json.dumps(response)
    # print(items)
    

    # 'body': json.dumps('good-buy-dynamodb-handler is working')
