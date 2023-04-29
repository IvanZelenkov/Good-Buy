
"""
Docstring for pylint
Handle Lambdas
does nothing currently
"""
import json
import boto3
from ses_identities import SesIdentity
import botocore.exceptions

def lambda_handler(event, context):
    """
    Prints, event and context, adds text to a json file
    """
    ses_client = boto3.client("ses", region_name = "us-east-1")
    email = event["email"]
    boolean = verify_email(email)
    if boolean is True:
        #notify somehow that there is no verification
        try:
            ses_client.create_template(
                Template = {
                    'TemplateName': 'Test',
                    'SubjectPart': 'Test email',
                    'TextPart': 'Your email has not been verfied',
                    'HtmlPart': 'Your email has not been verified'
                }
            )
        except botocore.exceptions.ClientError as error:
            print(error)
    else:
        #send the user another email notifiying them that thy have been verified
        try:
            ses_client.create_template(
                Template = {
                    'TemplateName': 'Test',
                    'SubjectPart': 'Test email',
                    'TextPart': 'Your email has been verfied',
                    'HtmlPart': 'Your email has been verified'
                }
            )
        except botocore.exceptions.ClientError as error:
            print(error)

    #template for method that should use ses to send an email
    worker = '{"email_address":' + ' "' + email + '"' + '}'
    ses_client.send_templated_email(
        Source = email,
        Destination = {
            'ToAddresses': [email],
            'CcAddresses': [email],
        },
        ReplyToAddresses = [email],
        Template = 'Test',
        TemplateData = worker
    )

    if boolean is True: #if verified, subscrive to an sns topic
        sns_client = boto3.client('sns')
        snsArn = 'arn:aws:sns:Region:AccountID:TestTopic'
        message = "This is a test notification."

        sns_client.publish(
            TopicArn = snsArn,
            Message = message ,
            Subject='Hello'
            )
    #after it's verified, we can subscirbe to an sns topic
    print("Hello from Lambda!" + event + context)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

#referenced this for help in this lambda function for anyone that is curious:
#https://docs.aws.amazon.com/ses/latest/dg/example_ses_Scenario_SendEmail_section.html

def verify_email(email):
    '''
    Docstring for email function
    '''
    ses_client = boto3.client("ses", region_name = "us-east-1")
    ses_identity = SesIdentity(ses_client)
    response1 = ses_client.verify_domain_identity(
        Domain = "testinguser1"
    )
    print(response1)

    response2 = ses_client.verify_email_identity(
        EmailAddress = str(email)
    )
    print(response2)
    status = ses_identity.get_identity_status(email)
    return status == 'Success'
    
