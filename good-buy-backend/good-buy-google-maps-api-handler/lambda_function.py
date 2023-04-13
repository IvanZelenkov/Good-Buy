"""
This module contains a Lambda function that retrieves JSON data from an S3 bucket
and returns it as a response.
"""

import json
import os
import boto3


def lambda_handler():
    """
    This is a module docstring meant for passing the linter.
    """
    stores = ["walmart", "rouses", "winn_dixie"]
    jsons = []

    s3_resource = boto3.resource('s3')
    bucket_name = os.getenv('S3_BUCKET_NAME')
    folder_name = "products"

    for store in stores:
        key = folder_name + "/" + store + "_products.json"
        s_3_object = s3_resource.Object(bucket_name, key)
        body = s_3_object.get()["Body"].read().decode("utf-8")
        jsons.append(body)

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body": json.dumps(jsons)
    }
