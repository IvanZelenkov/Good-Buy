"""
Docstring for pylint
Handle Lambdas
does nothing currently
"""
import json
def lambda_handler(event, context):
    """
    Prints, event and context, adds text to a json file
    """
    print("Hello from Lambda!" + event + context)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
