
"""
Docstring for pylint
Handle Lambdas
does nothing currently
"""
import json
import boto3

def lambda_handler(event, context):
    """
    Prints, event and context, adds text to a json file
    """
    email = event["email"]
    verify_email(email)
    print("Hello from Lambda!" + event + context)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }



def verify_email(email):
    '''
    Docstring for email function
    '''
    ses_client = boto3.client("ses", region_name = "us-east-1")
    response1 = ses_client.verify_domain_identity(
        Domain = "testinguser1"
    )
    print(response1)

    response2 = ses_client.verify_email_identity(
        EmailAddress = str(email)
    )
    print(response2)
    return email
