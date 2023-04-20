'''
Unittest for DynamoDB to test route functionality
and database interactivity.
'''
import os
import sys
import unittest
# from unittest import TestCase
import boto3
from moto import mock_dynamodb
# , PostAction, PutAction, DeleteAction

current_dir = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current_dir)
print(current_dir)
print(parent)
# test_dir = os.path.join(current_dir, "./good")
sys.path.append(parent)
from lambda_function import GetAction

test_get_event ={
    "queryStringParameters":{"ID":"2"},
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

@mock_dynamodb
class TestDBLambda(unittest.TestCase):
    '''Class holding Test Cases'''

    def test_lambda_get_user(self):
        '''Testing a get request for 
        path: /database/user-account'''
        # boto3.setup_default_session()
        # client = boto3.client("dynamodb", region_name = "us-east-1")
        dynamodb = boto3.resource("dynamodb")
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
        table.put_item(
                Item = test_item
        )
        get_action = GetAction(test_get_event, dynamodb.Table("TEST_Users"))
        get_action.set_action()
        response = get_action.action()
        self.assertEqual(test_get_response["Item"], response['Item'])
