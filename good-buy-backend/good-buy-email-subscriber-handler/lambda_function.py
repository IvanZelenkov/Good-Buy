
"""
Docstring for pylint
Handle Lambdas
does nothing currently
"""
import json
import boto3
import botocore.exceptions
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    """
    Prints, event and context, adds text to a json file
    """
    ses_client = boto3.client("ses", region_name = "us-east-1")
    email = event["email"]
    boolean = verify_email(email)
    if boolean is False:
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

    if boolean is True: #if verified, subscribe to an sns topic
        sns_client = boto3.client('sns', region_name = 'us-east-1')
        topic_arn = "topic"
        sns_client.subscribe(TopicArn=topic_arn, Protocol="email", Endpoint="user@server.com")
        sns_client.publish(
            TopicArn=topic_arn,
            Message="This is a message",
            Subject="notification")

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

    response1 = ses_client.verify_domain_identity(Domain = "testinguser1")
    print(response1)

    response2 = ses_client.verify_email_identity(EmailAddress = str(email))
    response = ""
    try:
        identity = email
        response = ses_client.get_identity_verification_attributes(Identities=[identity])
        status = response['VerificationAttributes'].get(
        identity, {'VerificationStatus': 'NotFound'})['VerificationStatus']
        #logger.info("Got status of %s for %s.", status, identity)
    except ClientError:
        print("error")
        #ogger.exception("Couldn't get status for %s.", identity)
    print(response2)
    status = response
    return status == 'Success'
