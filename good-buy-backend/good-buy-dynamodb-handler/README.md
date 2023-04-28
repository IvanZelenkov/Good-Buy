## good-buy-dynamodb-handler

good-buy-dynamodb-handler lambda manages the data in the DynamoDB 
service performing scanning and retrieving of stores, products, and 
user activity data. Also, it calls the Amazon SNS service to send out 
notifications about deals based on the stored user activity.

To test out the functionality of this lambda function:
1. Go to API Gateway.
    - Go to the Good-Buy-Rest-Api
    - On the left side of the screen, go to "Stages".
    - Press "Development"
    - There you should see the "Invoke URL"
2. Go to Postman and past that Invoke URL.
    - Then append the path you want to the end of that invoke URL and choose an HTTP method.
        - Ex. <invokeURL>/database/shopping-cart

Make sure to provide the needed parameters or body data needed for each function.
- GET requires an integer parameter of "ID"
        ![Get Request](./images/Screenshot%202023-04-11%20110109.png)
- POST requires body data in the form of JSON of the information that you want to send to the database.
        ![Post Request](./images/Screenshot%202023-04-11%20202248.png)
- For the user, PUT requires an integer parameter of "ID" for the user that you want 
the update and the body data of the user with the new information.
        ![Put Request User](./images/Screenshot%202023-04-11%20202938.png)
        ![Put Request User 2](./images/Screenshot%202023-04-11%20203309.png)
- For the shopping cart, PUT reqires a string parameter of "ID" of the user's email,
action parameter of either add or delete, and the body data of the product that you want to add to the cart or delete from the cart.
        ![Put Request Cart](./images/PutCartAdd.png)
        ![Put Request Cart 2](./images/PutCartDelete.png)
        ![Put Request Cart 2](./images/PutCartBody.png)
- DELETE requires an integer parameter of "ID" of the item you want to delete.
        ![Delete Request](./images/Screenshot%202023-04-11%20203502.png)