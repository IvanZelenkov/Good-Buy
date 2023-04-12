import json
import boto3
import os

def lambda_handler(event, context):
    print(event)

    stores = ["walmart", "rouses", "winn_dixie"]
    jsons = []

    s3 = boto3.resource('s3')
    bucket_name = os.getenv('S3_BUCKET_NAME')
    folder_name = "products"

    for i in stores:
        key = folder_name + "/" + i +  "_products.json"
        s3_object = s3.Object(bucket_name, key)
        body = s3_object.get()['Body'].read().decode('utf-8')
        jsons.append(body)'''
This is a module docstring meant to pass the linter
'''
import json
import os
import boto3

def lambda_handler(event, context):
    '''
    This is a module docstring meant for passin the linter
    '''
    print(event)
    print(context)
    stores = ["walmart", "rouses", "winn_dixie"]
    jsons = []

    s_3 = boto3.resource('s3')
    bucket_name = os.getenv('S3_BUCKET_NAME')
    folder_name = "products"

    for i in stores:
        key = folder_name + "/" + i +  "_products.json"
        s_3_object = s_3.Object(bucket_name, key)
        body = s_3_object.get()['Body'].read().decode('utf-8')
        jsons.append(body)



    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(jsons)
    }




    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(jsons)
    }
