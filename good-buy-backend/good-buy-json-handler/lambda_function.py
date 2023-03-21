import os
import boto3
import json


def lambda_handler(event, context):
    print(event)
    s3 = boto3.resource('s3')
    bucket_name = os.getenv('S3_BUCKET_NAME')
    folder_name = "products"
    key = folder_name + "/" + event['store_name'] + "_products.json"
    s3_object = s3.Object(bucket_name, key)
    body = s3_object.get()['Body'].read().decode('utf-8')

    return {
        'statusCode': 200,
        'body': json.loads(body)
    }
