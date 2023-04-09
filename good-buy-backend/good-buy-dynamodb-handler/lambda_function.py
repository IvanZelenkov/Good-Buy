import json
import boto3
import os
from abc import ABC, abstractmethod
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
    # When using this path and method, must provide ID of the shopping cart you want to retrieve as a query parameter.
    if event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'GET':
        table = db.Table("Shopping_Cart")
        getAction = GetAction(event, table)
        response = getAction.action()
        # print(response['Item']['cart'])
        print(response['Item'])
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item']['cart'], indent=2,default=str)
        }
    # When using this path and method, must provide ID of the user account you want to retrieve as a query parameter.
    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'GET':
        table = db.Table("Users")
        getAction = GetAction(event, table)
        response = getAction.action()
        print(response['Item'])
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item'], indent=2,default=str)
        }
    # When using this path and method, must provide the ID and the cart values the newly created cart as json body data.
    elif event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'POST':
        table = db.Table("Shopping_Cart")
        decodedEvent = json.loads(event['body'])
        Item ={
                'ID': int(decodedEvent['ID']),
                'cart': decodedEvent['cart']
        }
        postAction = PostAction(event, table, Item)
        response = postAction.action()
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Created new shopping cart'
        }
    # When using this path and method, must provide the ID email, password, phone, and username values the newly created cart as json body data.
    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'POST':
        table = db.Table("Users")
        decodedEvent = json.loads(event['body'])
        Item ={
                'ID': int(decodedEvent['ID']),
                'email': decodedEvent['email'],
                'password': decodedEvent['password'],
                'phone': decodedEvent['phone'],
                'username': decodedEvent['username']
            }
        postAction = PostAction(event, table, Item)
        response = postAction.action()
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
    # When using this path and method, send the ID of the shopping cart you want to update as a query parameter and then 
    # pass the new cart data as body data. 
    elif event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'PUT':
        
        table = db.Table("Shopping_Cart")
        decodedEvent = json.loads(event['body'])
        
        UpdateExpression = "SET cart =:cart"
        ExpressionAttributeValues = {
            ':cart' : decodedEvent['cart']
        }

        # decodedExpressionAttributes = json.dumps(ExpressionAttributeValues)

        putAction = PutAction(event, table, UpdateExpression, ExpressionAttributeValues)
        response = putAction.action()
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Updated a shopping cart'
        }
    # When using this path and method, must pass the ID of the user accound you want to update as a query parameter,
    # and then pass the new user acount data as body data.
    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'PUT':
        
        table = db.Table("Users")
        decodedEvent = json.loads(event['body'])
        
        UpdateExpression = "SET password = :password, phone = :phone, username = :username"
        ExpressionAttributeValues = {
            ':password' : decodedEvent['password'],
            ':phone' : decodedEvent['phone'],
            ':username': decodedEvent['username']
        }

        putAction = PutAction(event, table, UpdateExpression, ExpressionAttributeValues)
        response = putAction.action()

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Updated a user account'
        }
    # When using this path and method, must pass the ID of the shopping cart that you want to delete as a query parameter.
    elif event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'DELETE':
        table = db.Table("Shopping_Cart")
        
        deleteAction = DeleteAction(event, table)
        response = deleteAction.action()

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Deleted a shopping cart'
        }
    # When using this path and method, must pass the ID of the user acount you want to delete at query parameter. 
    elif event['path'] == '/database/user-account' and event['httpMethod'] == 'DELETE':
        table = db.Table("Users")
        
        deleteAction = DeleteAction(event, table)
        response = deleteAction.action()
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': 'Deleted a user account'
        }

class DBActionInterface(ABC):
    @abstractmethod
    def action(self):
        pass

class GetAction(DBActionInterface):
    
    def __init__(self, event, table):
        self.event = event
        self.table = table
    
    def action(self):        
        # print(event['queryStringParameters']['ID'])
        IDvalue = self.event['queryStringParameters']['ID']
        response = self.table.get_item(
            Key = {
                'ID': int(IDvalue)
            }
        )
        return response

class PostAction(DBActionInterface):
    def __init__(self, event, table, Item):
        self.event = event
        self.table = table
        self.Item = Item

    def action(self):
        response = self.table.put_item(
            Item = self.Item
        )
        return response

class PutAction(DBActionInterface):
    def __init__(self, event, table, updateExpression, expressionAttributeValues):
        self.event = event 
        self.table = table
        self.updateExpression = updateExpression
        self.expressionAttributeValues = expressionAttributeValues

    def action(self):
        IDvalue = self.event['queryStringParameters']['ID']
        # decodedExpressionAttributes = json.loads(self.expressionAttributeValues)
        response = self.table.update_item(
            Key = {
                'ID' : int(IDvalue)
            },
            UpdateExpression = self.updateExpression,
            ExpressionAttributeValues = self.expressionAttributeValues
        )
        return response

class DeleteAction(DBActionInterface):
    def __init__(self, event, table):
        self.event = event
        self.table = table 
    def action(self):
        IDvalue = self.event['queryStringParameters']['ID']
        response = self.table.delete_item(
            Key = {
                'ID' : int(IDvalue)
            }
        )
        return response