## good-buy-store-apis-handler

good-buy-store-apis-handler lambda retrieves data from several
store APIs, processes and returns the best matches to the user.

To update the code in a lambda function, do the following:
1. Create a ZIP file.
```
zip good-buy-store-apis-handler.zip lambda_function.py
```
2. Upload a ZIP file from the CLI to AWS.
```
aws lambda update-function-code \
--function-name good-buy-store-apis-handler \
--zip-file fileb://good-buy-store-apis-handler.zip \
--profile <profile-name>
```