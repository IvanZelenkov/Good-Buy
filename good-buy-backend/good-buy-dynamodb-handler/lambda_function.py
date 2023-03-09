import json


def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('good-buy-dynamodb-handler is working')
    }
