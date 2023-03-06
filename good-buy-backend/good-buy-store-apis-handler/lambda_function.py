import requests


def lambda_handler(event, context):
    products_endpoint = event["products-endpoint"]
    response = requests.get(products_endpoint)

    return {
        'statusCode': 200,
        'body': response.json()
    }