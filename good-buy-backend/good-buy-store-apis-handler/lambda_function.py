import boto3
import os

from S3Service import S3Service
from ProductService import ProductService


def lambda_handler(event, context):
    s3 = boto3.resource('s3', aws_access_key_id=os.getenv('ACCESS_KEY'),
        aws_secret_access_key=os.getenv('SECRET_ACCESS_KEY')
    )
    s3_service = S3Service(s3)
    product_service = ProductService(s3_service, event)

    if not event:
        body = product_service.get_all_products()
    elif "product_id" in event and "store_name" in event:
        body = product_service.get_product_by_id_and_store_name()
    elif "store_name" in event:
        body = product_service.get_products_by_store_name()
    elif "product_name" in event:
        body = product_service.get_identical_products_from_stores()
    else:
        body = {}

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET'
        },
        'body': body
    }
