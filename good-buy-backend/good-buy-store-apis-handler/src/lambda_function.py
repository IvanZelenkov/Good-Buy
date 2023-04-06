import os
import sys

current_dir = os.path.dirname(os.path.realpath(__file__))
service_dir = os.path.join(current_dir, 'service')
strategy_dir = os.path.join(current_dir, 'strategy')
sys.path.append(service_dir)
sys.path.append(strategy_dir)

import boto3

from S3Service import S3Service
from ProductService import ProductService
from StoreNameStrategy import StoreNameStrategy
from RatingStrategy import RatingStrategy


def lambda_handler(event, context):
    try:
        s3 = boto3.resource(
            's3',
            aws_access_key_id=os.getenv('ACCESS_KEY'),
            aws_secret_access_key=os.getenv('SECRET_ACCESS_KEY')
        )
        s3_service = S3Service(s3)
        product_service = ProductService(s3_service, event)

        if not event:
            body = product_service.get_all_products()
        elif "filter" in event and event.get("filter") == "by store name":
            store_name_strategy = StoreNameStrategy()
            body = product_service.filter(store_name_strategy)
        elif "filter" in event and event.get("filter") == "by rating":
            rating_strategy = RatingStrategy()
            body = product_service.filter(rating_strategy)
        elif "product_id" in event and "store_name" in event:
            body = product_service.get_product_by_id_and_store_name()
        elif "product_name" in event:
            body = product_service.get_identical_products_from_stores()
        else:
            body = {}

        return {
            "isBase64Encoded": True,
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET'
            },
            "body": body
        }
    except Exception as error:
        return {
            'statusCode': 500,
            'body': f"An error occurred: {str(error)}"
        }
