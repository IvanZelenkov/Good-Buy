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
