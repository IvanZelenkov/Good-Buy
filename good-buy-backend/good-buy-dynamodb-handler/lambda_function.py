'''
This module defines the lambda function that will return interact with
the DynamoDB database. When invoked, it will take an event as input
and take query string parameters or body data from it.
'''

import json
import os
from abc import ABC, abstractmethod
import tempfile
import boto3

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

session = boto3.Session(aws_access_key_id=access_key,
                        aws_secret_access_key=secret_access_key,
                        region_name="us-east-1")

db = session.resource("dynamodb")


def lambda_handler(event, context):
    '''Lambda function that will take in an event and perform
    different actions depending on the path and HTTP Method
    sent in the event parameter.
    '''
    # When using this path and method, must provide ID of the shopping
    # cart you want to retrieve as a query parameter.
    print(event)
    if event['body']:
        decoded_event = json.loads(event['body'])
    if event['httpMethod'] == 'OPTIONS':
        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': ''
        }
    if event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'GET':
        # table = db.Table("Shopping_Cart")
        get_action = GetAction(event, db.Table("Shopping_Cart"))
        get_action.set_action()
        response = get_action.action()
        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }
    # When using this path and method, must provide ID of the user account you
    # want to retrieve as a query parameter.
    if event['path'] == '/database/user-account' and event['httpMethod'] == 'GET':
        # table = db.Table("Users")
        get_action = GetAction(event, db.Table("Users"))
        get_action.set_action()
        response = get_action.action()
        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }
    # When using this path and method, must provide the ID and the cart
    # values the newly created cart as json body data.
    if event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'POST':
        # table = db.Table("Shopping_Cart")
        # decoded_event = json.loads(event['body'])
        item = {
            'ID': decoded_event['ID'],
            'cart': decoded_event['cart']
        }
        post_action = PostAction(event, db.Table("Shopping_Cart"), item)
        post_action.set_action()
        response = post_action.action()
        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }
    # When using this path and method, must provide the ID email, password,
    # phone, and username values the newly created cart as json body data.
    if event['path'] == '/database/user-account' and event['httpMethod'] == 'POST':
        # table = db.Table("Users")
        # decoded_event = json.loads(event['body'])
        item = {
            'ID': int(decoded_event['ID']),
            'email': decoded_event['email'],
            'password': decoded_event['password'],
            'phone': decoded_event['phone'],
            'username': decoded_event['username']
        }

        post_action = PostAction(event, db.Table("Users"), item)
        gen_empty_cart = GenerateEmptyCart(decoded_event['email'])
        empty_cart = gen_empty_cart.generateEmptyCartWithUSERID()
        post_empty_cart_action = PostAction(event, db.Table("Shopping_Cart"),empty_cart)
        post_action.set_action()
        response = post_action.action()
        post_empty_cart_action.set_action()
        post_empty_cart_action.action()
        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }

    # Idea for updating cart
    # When an item is added or removed from the cart,
    # it should send body data of the updated cart.
    # Then retrieve that body data to update it with.
    # When using this path and method, send the ID of the
    # shopping cart you want to update as a query parameter and then
    # pass the new cart data as body data.
    if event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'PUT':
        # table = db.Table("Shopping_Cart")
        # decoded_event = json.loads(event['body']['cart'])

        # decodedExpressionAttributes = json.dumps(expression_attribute_values)

        # Get the initial shopping cart value
        get_action = GetAction(event, db.Table("Shopping_Cart"))
        get_action.set_action()
        # Shopping cart is in res['Item']
        res = get_action.action()
        # email,products,res, context
        if event['queryStringParameters']['action'] == 'add':
            add_to_cart = AddToCart(event['queryStringParameters']['ID'], event['body'], res)
            new_cart = add_to_cart.addToCartJSON()
        elif event['queryStringParameters']['action'] == 'delete':
            remove_from_cart = DeleteFromCart(event['queryStringParameters']['ID'],
                                              event['body'], res)
            new_cart = remove_from_cart.removeFromCart()
        print(new_cart)
        update_expression = "SET cart =:cart"
        expression_attribute_values = {
            ':cart': new_cart
        }

        put_action = PutAction(event, db.Table("Shopping_Cart"),
                               update_expression, expression_attribute_values)
        put_action.set_action()
        response = put_action.action()

        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }
    # When using this path and method, must pass the ID of
    # the user accound you want to update as a query parameter,
    # and then pass the new user acount data as body data.
    if event['path'] == '/database/user-account' and event['httpMethod'] == 'PUT':
        # table = db.Table("Users")
        # decoded_event = json.loads(event['body'])

        update_expression = "SET password = :password, phone = :phone, username = :username"
        expression_attribute_values = {
            ':password': decoded_event['password'],
            ':phone': decoded_event['phone'],
            ':username': decoded_event['username']
        }

        put_action = PutAction(event, db.Table("Users"),
                               update_expression, expression_attribute_values)
        put_action.set_action()
        response = put_action.action()

        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }
    # When using this path and method, must pass the ID of the shopping cart
    # that you want to delete as a query parameter.
    if event['path'] == '/database/shopping-cart' and event['httpMethod'] == 'DELETE':
        # table = db.Table("Shopping_Cart")

        delete_action = DeleteAction(event, db.Table("Shopping_Cart"))
        delete_action.set_action()
        response = delete_action.action()

        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }
    # When using this path and method, must pass the ID of the user
    # acount you want to delete at query parameter.
    if event['path'] == '/database/user-account' and event['httpMethod'] == 'DELETE':
        # table = db.Table("Users")

        delete_action = DeleteAction(event, db.Table("Users"))
        delete_action.set_action()
        response = delete_action.action()

        ret_val = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            'body': json.dumps(response, indent=4, default=str)
        }
    return ret_val


class DBActionInterface(ABC):
    '''
    Interface for action that will interact with
    the DynamoDB database.
    '''

    @abstractmethod
    def action(self):
        '''Perform action'''

    @abstractmethod
    def set_action(self):
        '''Set action'''


class GetAction(DBActionInterface):
    '''
    This class defines that will perform a GET action on the
    DynamoDB database. This class takes an event parameter and
    a table parameter. After action is performed it will
    return response.
    '''

    def __init__(self, event, table):
        self.event = event
        self.table = table
        self.response = {}

    def set_action(self):
        if self.event['path'] == '/database/shopping-cart':
            id_value = self.event['queryStringParameters']['ID']
        elif self.event['path'] == '/database/user-account':
            id_value = int(self.event['queryStringParameters']['ID'])
        response = self.table.get_item(
            Key={
                'ID': id_value
            }
        )
        self.response = response

    def action(self):
        # print(event['queryStringParameters']['ID'])
        # id_value = self.event['queryStringParameters']['ID']
        # response = self.table.get_item(
        #     Key = {
        #         'ID': int(id_value)
        #     }
        # )
        # print(self.response)
        return self.response


class PostAction(DBActionInterface):
    '''
    This class defines that will perform a POST action on the
    DynamoDB database. This class takes an event parameter and
    a table parameter and an Item parameter. After action is performed
    it will return response.
    '''

    def __init__(self, event, table, item):
        self.event = event
        self.table = table
        self.item = item
        self.response = {}

    def action(self):
        # print(self.response)
        return self.response

    def set_action(self):
        response = self.table.put_item(
            Item=self.item
        )
        self.response = response


class PutAction(DBActionInterface):
    '''
    This class defines that will perform a PUT action on the
    DynamoDB database. This class takes an event parameter and
    a table parameter an updateExpression parameter, and an
    expressionAttributeValues parmeter. After action is performed it will
    return response.
    '''

    def __init__(self, event, table, update_expression, expression_attribute_values):
        self.event = event
        self.table = table
        self.update_expression = update_expression
        self.expression_attribute_values = expression_attribute_values
        self.response = {}

    def action(self):
        # print(self.response)
        return self.response

    def set_action(self):
        if self.event['path'] == '/database/shopping-cart':
            id_value = self.event['queryStringParameters']['ID']
        elif self.event['path'] == '/database/user-account':
            id_value = int(self.event['queryStringParameters']['ID'])
        # decodedExpressionAttributes = json.loads(self.expressionAttributeValues)
        response = self.table.update_item(
            Key={
                'ID': id_value
            },
            UpdateExpression=self.update_expression,
            ExpressionAttributeValues=self.expression_attribute_values
        )
        self.response = response


class DeleteAction(DBActionInterface):
    '''
    This class defines that will perform a DELETE action on the
    DynamoDB database. This class takes an event parameter and
    a table parameter. After action is performed it will
    return response.
    '''

    def __init__(self, event, table):
        self.event = event
        self.table = table
        self.response = {}

    def action(self):
        # print(self.response)
        return self.response

    def set_action(self):
        if self.event['path'] == '/database/shopping-cart':
            id_value = self.event['queryStringParameters']['ID']
        elif self.event['path'] == '/database/user-account':
            id_value = int(self.event['queryStringParameters']['ID'])
        response = self.table.delete_item(
            Key={
                'ID': id_value
            }
        )
        self.response = response

class AddToCart():
    '''
    This class defines the action of adding
    a new product to a cart.
    '''
    def __init__(self, email, products, prev_cart):
        self.email = email
        self.products = products
        self.prev_cart = prev_cart
        self.filename = email + ".json"

    def addToCartJSON(self):
        '''
        This function was created by Cooper to add a new product
        to a cart value for the shopping cart table in
        dynamodb.
        Must pass in an email from the query parameter string,
        a json product value from the event body,
        and intial cart value.
        '''
        # temp = tempfile.TemporaryFile()
        temp = tempfile.mkdtemp()

        # json_object = json.dumps(self.products, indent = 4)
        # This writes the initial cart value to the file
        # example filename is "/tmp/test@gmail.com.json"
        with open(temp + self.filename, 'w', encoding='UTF-8') as outfile:
            outfile.write(json.dumps(self.prev_cart,indent = 4))
            # json.dumps(self.prev_cart, self.filename,indent = 4)

        # This loads the initial cart value in the listObj.
        with open(temp + self.filename, 'r', encoding='UTF-8') as fp:
            listObj = json.load(fp)

        print(listObj["Item"]["cart"])
        # Append the new product the the existing cart value
        prod = json.loads(self.products)
        listObj["Item"]["cart"].append(prod)
        print(listObj["Item"]["cart"])

        # with open(temp + self.filename, 'w', encoding='UTF-8') as outfile:
        #     json.dump(listObj["Item"]["cart"],outfile,indent = 4)
        #     new_cart = json.load(outfile)

        # print("test")
        # print(json.dumps(listObj["Item"]["cart"], indent = 4))

        # with open(self.filename, "w", encoding='UTF-8') as json_file:
        #     json.dump(listObj, json_file, indent = 4, separators = (',',': '))

        # with open(self.filename, encoding='UTF-8') as cart_file:
        #     cart = json.load(cart_file)

        if os.path.exists(temp + self.filename):
            os.remove(temp + self.filename)
        else:
            print(temp + self.filename)

        return listObj["Item"]["cart"]

class DeleteFromCart():
    '''
    This class defines the action of
    removing an item from a user's cart.
    '''
    def __init__(self, email, products, prev_cart):
        self.email = email
        self.products = products
        self.prev_cart = prev_cart
        self.filename = email + '.json'

    def removeFromCart(self):
        '''
        This class will perform the action
        of removing an item.
        '''
        temp = tempfile.mkdtemp()

        with open(temp + self.filename, 'w', encoding='UTF-8') as outfile:
            outfile.write(json.dumps(self.prev_cart,indent = 4))

        with open(temp + self.filename, 'r', encoding='UTF-8') as fp:
            listObj = json.load(fp)
        prod = json.loads(self.products)
        list_cart = listObj["Item"]["cart"]
        item_index = list_cart.index(prod)
        list_cart.pop(item_index)
        return list_cart


class GenerateEmptyCart():
    '''This class defines an empty cart for a user.'''

    def __init__(self, email):
        self.email = email
        self.filename = email + ".json"

    def generateEmptyCartWithUSERID(self):
        '''This is the function for an empty cart, takes in a email address (String)'''
        temp = tempfile.mkdtemp()
        my_dict = {"ID": "", "cart": []}
        my_dict.update({"ID": self.email})
        jsonString = json.dumps(my_dict, indent = 4)
        # filename = "ShoppingCart_" + self.email + ".json"
        with open(temp + self.filename, "w", encoding='UTF-8') as outfile:
            outfile.write(jsonString)

        with open(temp + self.filename, 'r', encoding='UTF-8') as fp:
            listObj = json.load(fp)
        return listObj
