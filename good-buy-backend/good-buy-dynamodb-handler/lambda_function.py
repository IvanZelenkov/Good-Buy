import json

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('good-buy-store-apis-handler-buy-dynamodb-handler is working')
    }