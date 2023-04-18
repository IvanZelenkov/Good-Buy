"""
This module provides a Lambda function that has the capability to
filter products. Once triggered, the function takes an input event
and retrieves the query string parameters from it. The specified
filters are then applied to the products, and the function returns
the filtered products in a JSON-encoded response.
"""

import os
import sys
import json
from typing import Dict, Any
import boto3
from botocore.exceptions import NoCredentialsError

current_dir = os.path.dirname(os.path.realpath(__file__))
service_dir = os.path.join(current_dir, "service")
strategy_dir = os.path.join(current_dir, "strategy")
sys.path.append(service_dir)
sys.path.append(strategy_dir)

from StoreNameStrategy import StoreNameStrategy
from CustomerRatingStrategy import CustomerRatingStrategy
from PriceRangeStrategy import PriceRangeStrategy
from MaxPriceStrategy import MaxPriceStrategy
from MinPriceStrategy import MinPriceStrategy
from OnSaleStrategy import OnSaleStrategy
from ClearanceStrategy import ClearanceStrategy
from AvailabilityStrategy import AvailabilityStrategy
from ProductService import ProductService
from S3Service import S3Service

FILTER_STRATEGY_MAP = {
    "/filter-products/by-store-name": StoreNameStrategy,
    "/filter-products/by-customer-rating": CustomerRatingStrategy,
    "/filter-products/by-price-range": PriceRangeStrategy,
    "/filter-products/by-min-price": MinPriceStrategy,
    "/filter-products/by-max-price": MaxPriceStrategy,
    "/filter-products/by-sale": OnSaleStrategy,
    "/filter-products/by-clearance": ClearanceStrategy,
    "/filter-products/by-availability": AvailabilityStrategy
}


def lambda_handler(event: Dict[str, Any], context: Any) -> Any:
    """
        Filters products based on query string parameters and returns
        the filtered products as a JSON-encoded response.

         Args:
            The event that triggered the lambda function.

         Returns:
            A list of filtered products.
        """
    try:
        s3_resource = boto3.resource(
            "s3",
            aws_access_key_id=os.getenv("ACCESS_KEY"),
            aws_secret_access_key=os.getenv("SECRET_ACCESS_KEY")
        )
    except NoCredentialsError as error:
        return {
            "statusCode": 500,
            "body": f"An error occurred while authenticating with AWS: {str(error)}"
        }

    s3_service = S3Service(s3_resource)
    params = event["queryStringParameters"]
    product_service = ProductService(s3_service, params)

    if not params:
        body = product_service.get_all_products()
    elif params.get("product_id") and params.get("store_name"):
        body = product_service.get_product_by_id_and_store_name()
    elif params.get("product_name"):
        body = product_service.get_identical_products_from_stores()
    else:
        filter_path = event["path"]
        filter_class = FILTER_STRATEGY_MAP.get(filter_path)
        if filter_class:
            filter_value = params.get("filter_value")
            filter_strategy = filter_class(filter_value)
            body = product_service.filter(filter_strategy)
        else:
            body = {}

    return {
        "isBase64Encoded": True,
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Typ",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, GET"
        },
        "body": json.dumps(body)
    }
