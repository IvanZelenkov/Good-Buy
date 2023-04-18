import boto3
import pathlib
import os
from botocore.config import Config
from fpdf import FPDF
import sys
import json
import sys

def verify_email():
    email = input("Please provide an email address:")
    ses_client = boto3.client("ses", region_name = "us-east-1")
    response1 = ses_client.verify_domain_identity(
        Domain = "testinguser1"
    )

    response2 = ses_client.verify_email_identity(
        EmailAddress = str(email)
    )
    return email

def use_ses(email):#email must be verified first
    prompt = input("Please verify your email before continuing. \n Press enter when ready")
    ses_client = boto3.client("ses", region_name = "us-east-1")

    try:
        response = ses_client.create_template(
            Template = {
                'TemplateName': 'Test',
                'SubjectPart': 'Test email',
                'TextPart': 'Pdf is complete',
                'HtmlPart': 'Pdf is complete'
            }
        )
    except:
        print("Please ignore this message")


    #template for method that should use ses to send an email 
    worker = '{"email_address":' + ' "' + email + '"' + '}'
    response = ses_client.send_templated_email(
        Source = email,
        Destination = {
            'ToAddresses': [email],
            'CcAddresses': [email],
        },
        ReplyToAddresses = [email],
        Template = 'Test',
        TemplateData = worker
    )


def main():
	email = verify_email()
	use_ses(email)

if __name__ == "__main__":
	main()
