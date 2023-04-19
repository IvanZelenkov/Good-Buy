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
factory_dir = os.path.join(current_dir, "factory")
strategy_dir = os.path.join(current_dir, "strategy")
sys.path.append(service_dir)
sys.path.append(factory_dir)
sys.path.append(strategy_dir)

from IdenticalProductsFromStoresStrategy import IdenticalProductsFromStoresStrategy
from StoreNameStrategy import StoreNameStrategy
from CustomerRatingStrategy import CustomerRatingStrategy
from PriceRangeStrategy import PriceRangeStrategy
from LowestToHighestPriceStrategy import LowestToHighestPriceStrategy
from HighestToLowestPriceStrategy import HighestToLowestPriceStrategy
from OnSaleStrategy import OnSaleStrategy
from ClearanceStrategy import ClearanceStrategy
from AvailabilityStrategy import AvailabilityStrategy
from ProductService import ProductService
from S3Service import S3Service

FILTER_STRATEGY_MAP = {
    "productName": IdenticalProductsFromStoresStrategy,
    "storeName": StoreNameStrategy,
    "customerRating": CustomerRatingStrategy,
    "priceRange": PriceRangeStrategy,
    "minPrice": LowestToHighestPriceStrategy,
    "maxPrice": HighestToLowestPriceStrategy,
    "onSale": OnSaleStrategy,
    "onClearance": ClearanceStrategy,
    "availability": AvailabilityStrategy
}


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Filters products based on query string parameters and returns
    the filtered products as a JSON-encoded response.

    Args:
        event (Dict[str, Any]): The event that triggered the lambda function.

    Returns:
        A dictionary representing a JSON-encoded HTTP response containing:
            - isBase64Encoded (bool): Whether the response body is base64-encoded or not.
            - statusCode (int): HTTP status code of the response.
            - headers (Dict[str, str]): HTTP headers of the response.
            - body (str): JSON-encoded string containing the filtered products.
    """
    try:
        s3_client = boto3.resource(
            "s3",
            aws_access_key_id=os.getenv("ACCESS_KEY"),
            aws_secret_access_key=os.getenv("SECRET_ACCESS_KEY")
        )
    except NoCredentialsError as error:
        return {
            "statusCode": 500,
            "body": f"An error occurred while authenticating with AWS: {str(error)}"
        }

    s3_service = S3Service(s3_client)
    params = event["queryStringParameters"]
    product_service = ProductService(s3_service)

    if not params:
        body = product_service.get_all_products()
    else:
        filter_strategies = []
        for param_name, strategy_class in FILTER_STRATEGY_MAP.items():
            param_value = params.get(param_name)
            if param_value:
                strategy = strategy_class(param_value)
                filter_strategies.append(strategy)

        body = product_service.filter(filter_strategies)

    return {
        "isBase64Encoded": True,
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, GET"
        },
        "body": json.dumps(body)
    }
