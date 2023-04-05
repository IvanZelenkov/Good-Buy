import json
from ProductService import ProductService


def lambda_handler(event, context):
    product_service = ProductService(event)
    body = product_service.get_all_products()

    return {
        'statusCode': 200,
        'body': json.loads(body)
    }
