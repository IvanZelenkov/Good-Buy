## good-buy-google-maps-handler

good-buy-google-maps-handler lambda work directly with the Google Maps API, 
which will return the distance between the user and different stores that have 
a particular product. This feature should help make the user a better choice.

To update the code in a lambda function, do the following:
1. Create a ZIP file.
```
zip good-buy-google-maps-handler.zip lambda_function.py
```
2. Upload a ZIP file from the CLI to AWS.
```
aws lambda update-function-code \
--function-name good-buy-google-maps-handler \
--zip-file fileb://good-buy-google-maps-handler.zip \
--profile <profile-name>
```