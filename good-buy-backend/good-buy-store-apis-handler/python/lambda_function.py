import json
from ProductService import ProductService


def lambda_handler(event, context):
    product_service = ProductService(event)
    body = product_service.get_all_products()

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET'
        },
        'body': json.dumps(body)
    }
