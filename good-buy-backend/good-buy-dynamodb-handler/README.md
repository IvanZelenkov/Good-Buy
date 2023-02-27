## good-buy-dynamodb-handler

good-buy-dynamodb-handler lambda manages the data in the DynamoDB 
service performing scanning and retrieving of stores, products, and 
user activity data. Also, it calls the Amazon SNS service to send out 
notifications about deals based on the stored user activity.

To update the code in a lambda function, do the following:
1. Create a ZIP file.
```
zip good-buy-dynamodb-handler.zip lambda_function.py
```
2. Upload a ZIP file from the CLI to AWS.
```
aws lambda update-function-code \
--function-name good-buy-dynamodb-handler \
--zip-file fileb://good-buy-dynamodb-handler.zip \
--profile <profile-name>
```