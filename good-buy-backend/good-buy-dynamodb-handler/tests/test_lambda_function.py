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

    def test_lambda_get_user(self):
        '''Testing a get request for 
        DynamoDB Users table
        path: /database/user-account'''
        # boto3.setup_default_session()
        # client = boto3.client("dynamodb", region_name = "us-east-1")
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Users",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "N"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Users")
        test_get_event ={
            "queryStringParameters":{"ID":"2"},
            "path": "/database/user-account"
        }
        test_item = {
            "ID": int("2"),
            "email": "slgay@my.uno.edu",
            "password": "1",
            "phone": "2222222222",
            "username": "SuaryhaGay",
        }
        test_get_response ={
            "Item": {
                "ID": int("2"),
                "password": "1",
                "username": "SuaryhaGay",
                "email": "slgay@my.uno.edu",
                "phone": "2222222222"
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
        get_action = GetAction(test_get_event, dynamodb.Table("TEST_Users"))
        get_action.set_action()
        response = get_action.action()
        self.assertEqual(test_get_response["Item"], response['Item'])

    def test_lambda_post_user(self):
        '''Testing a post request for 
        DynamoDB Users table
        path: /database/user-account'''
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Users",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "N"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Users")
        test_post_event = {
            "body": {
                "ID": 5,
                "email": "johny@gmail.com",
                "password": "1234",
                "phone": "5040000000",
                "username": "Johny"
            }
        }
        test_item = {
            "ID": 5,
            "email": "johny@gmail.com",
            "password": "1234",
            "phone": "5040000000",
            "username": "Johny"
        }
        post_action = PostAction(test_post_event, table, test_item)
        post_action.set_action()
        post_action.action()
        test_response = table.get_item(
            Key={
                'ID': 5
            }
        )
        self.assertEqual(test_response['Item'], test_item)

    def test_lambda_put_user(self):
        '''Testing a put request for 
        DynamoDB Users table
        path: /database/user-account'''
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Users",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "N"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Users")
        test_event = {
            "queryStringParameters":{"ID":"5"},
            "path": "/database/user-account"
        }
        update_expression = "SET password = :password, phone = :phone, username = :username"
        expression_attribute_values = {
            ':password': "1234",
            ':phone': "5041111111",
            ':username': "Johny1234"
        }
        test_item = {
            'ID': 5,
            'email': "johny@gmail.com",
            'password': "1234",
            'phone': "5040000000",
            'username': "Johny"
        }
        expected_item = {
            'ID': 5,
            'email': "johny@gmail.com",
            'password': "1234",
            'phone': "5041111111",
            'username': "Johny1234"
        }
        table.put_item(
            Item = test_item
        )
        put_action = PutAction(test_event, table, update_expression, expression_attribute_values)
        put_action.set_action()
        put_action.action()
        test_response = table.get_item(
            Key={
                'ID': 5
            }
        )
        self.assertEqual(test_response['Item'], expected_item)

    def test_lambda_delete_user(self):
        '''Testing a delete request for 
        DynamoDB Users table
        path: /database/user-account'''
        dynamodb = boto3.resource("dynamodb", region_name = "us-east-1")
        dynamodb.create_table(
            TableName="TEST_Users",
            KeySchema = [{"AttributeName": "ID", "KeyType": "HASH"}],
            AttributeDefinitions =[
                {"AttributeName": "ID", "AttributeType": "N"},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table = dynamodb.Table("TEST_Users")
        test_item = {
            'ID': 5,
            'email': "johny@gmail.com",
            'password': "1234",
            'phone': "5040000000",
            'username': "Johny"
        }
        table.put_item(
            Item = test_item
        )
        response = table.get_item(
            Key={
                'ID': 5
            }
        )
        test_event = {
            "queryStringParameters":{"ID":"5"},
            "path": "/database/user-account"
        }
        self.assertEqual(response['Item'],test_item)
        delete_action = DeleteAction(test_event, table)
        delete_action.set_action()
        delete_action.action()
        response2 = table.get_item(
            Key={
                'ID': 5
            }
        )
        self.assertNotIn('Item', response2, 'Item is not in response')
