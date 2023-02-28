## good-buy-store-apis-handler

good-buy-store-apis-handler lambda retrieves data from several
store APIs, processes and returns the best matches to the user.

Use the following steps to authenticate and push an image to the `good-buy-ecr` repository.
1. Retrieve an authentication token and authenticate your Docker client to your registry.
Use the AWS CLI:
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 981684844178.dkr.ecr.us-east-1.amazonaws.com
```
2. Build your Docker image using the following command. You can skip this step if your image is already built:
```
docker build -t good-buy-ecr:store-apis-handler .
```
3. After the build completes, tag your image so you can push the image to this repository:
```
docker tag good-buy-ecr:store-apis-handler 981684844178.dkr.ecr.us-east-1.amazonaws.com/good-buy-ecr:store-apis-handler
```
4. Run the following command to push this image to your newly created AWS repository:
```
docker push 981684844178.dkr.ecr.us-east-1.amazonaws.com/good-buy-ecr:store-apis-handler
```