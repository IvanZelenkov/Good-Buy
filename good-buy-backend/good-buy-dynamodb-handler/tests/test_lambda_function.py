'''
Unittest for DynamoDB to test route functionality
and database interactivity.
'''
import os
import sys
import unittest
import boto3
from moto import mock_dynamodb

current_dir = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current_dir)
print(current_dir)
print(parent)
# test_dir = os.path.join(current_dir, "./good")
sys.path.append(parent)
from lambda_function import GetAction, PostAction , PutAction, DeleteAction



@mock_dynamodb
class TestDBLambda(unittest.TestCase):
    '''Class holding Test Cases'''

    def test_lambda_get_cart(self):
        '''Testing a get request for 
        DynamoDB Users table
        path: /database/user-account'''
        # boto3.setup_default_session()
        # client = boto3.client("dynamodb", region_name = "us-east-1")
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Cart",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "S"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Cart")
        test_get_event ={
            "queryStringParameters":{"ID":"test@gmail.com"},
            "path": "/database/shopping-cart"
        }
        test_item = {
            "ID": "test@gmail.com",
            "cart": []
        }
        test_get_response ={
            "Item": {
                "ID": "test@gmail.com",
                "cart": []
            },
            "ResponseMetadata": {
                "RequestId": "FH55D743RTS0GDBFB33VVNDDDFVV4KQNSO5AEMVJF66Q9ASUAAJG",
                "HTTPStatusCode": 200,
                "HTTPHeaders": {
                    "server": "Server",
                    "date": "Thu, 20 Apr 2023 00:40:33 GMT",
                    "content-type": "application/x-amz-json-1.0",
                    "content-length": "136",
                    "connection": "keep-alive",
                    "x-amzn-requestid": "FH55D743RTS0GDBFB33VVNDDDFVV4KQNSO5AEMVJF66Q9ASUAAJG",
                    "x-amz-crc32": "2246314225"
                },
                "RetryAttempts": 0
            }
        }
        table.put_item(
                Item = test_item
        )
        get_action = GetAction(test_get_event, dynamodb.Table("TEST_Cart"))
        get_action.set_action()
        response = get_action.action()
        self.assertEqual(test_get_response["Item"], response['Item'])

    def test_lambda_post_cart(self):
        '''Testing a post request for 
        DynamoDB Users table
        path: /database/user-account'''
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Cart",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "S"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Cart")
        test_post_event = {
            "body": {
                "ID": "test@gmail.com",
                "cart": []
            }
        }
        test_item = {
            "ID": "test@gmail.com",
            "cart": []
        }
        post_action = PostAction(test_post_event, table, test_item)
        post_action.set_action()
        post_action.action()
        test_response = table.get_item(
            Key={
                'ID': "test@gmail.com"
            }
        )
        self.assertEqual(test_response['Item'], test_item)

    def test_lambda_put_cart(self):
        '''Testing a put request for 
        DynamoDB Users table
        path: /database/user-account'''
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Cart",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "S"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Cart")
        test_event = {
            "queryStringParameters":{"ID":"test@gmail.com"},
            "path": "/database/shopping-cart"
        }
        update_expression = "SET cart =:cart"
        expression_attribute_values = {
            ':cart': [
                {
                    "color": "N/A",
                    "image_url": "unique_url",
                    "price": "3.6",
                    "store_link": "https://www.rouses.com/shop",
                    "rating": "4.7",
                    "store_name": "Rouses",
                    "ID": "70252983",
                    "brand": "N/A",
                    "store_location": "701 Baronne St, New Orleans",
                    "Name": "test2"
                }
            ]
        }
        test_item = {
            'ID': "test@gmail.com",
            'cart': []
        }
        expected_item = {
            'ID': "test@gmail.com",
            'cart': [
                {
                    "color": "N/A",
                    "image_url": "unique_url",
                    "price": "3.6",
                    "store_link": "https://www.rouses.com/shop",
                    "rating": "4.7",
                    "store_name": "Rouses",
                    "ID": "70252983",
                    "brand": "N/A",
                    "store_location": "701 Baronne St, New Orleans",
                    "Name": "test2"
                }
            ]
        }
        table.put_item(
            Item = test_item
        )
        put_action = PutAction(test_event, table, update_expression, expression_attribute_values)
        put_action.set_action()
        put_action.action()
        test_response = table.get_item(
            Key={
                'ID': "test@gmail.com"
            }
        )
        self.assertEqual(test_response['Item'], expected_item)

    def test_lambda_delete_cart(self):
        '''Testing a delete request for 
        DynamoDB Users table
        path: /database/user-account'''
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Cart",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "S"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Cart")
        test_item = {
            "ID": "test@gmail.com",
            "cart": []
        }
        table.put_item(
            Item = test_item
        )
        response = table.get_item(
            Key={
                'ID': "test@gmail.com"
            }
        )
        test_event = {
            "queryStringParameters":{"ID":"test@gmail.com"},
            "path": "/database/shopping-cart"
        }
        self.assertEqual(response['Item'],test_item)
        delete_action = DeleteAction(test_event, table)
        delete_action.set_action()
        delete_action.action()
        response2 = table.get_item(
            Key={
                'ID': "test@gmail.com"
            }
        )
        self.assertNotIn('Item', response2, 'Item is not in response')
