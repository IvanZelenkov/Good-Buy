import os
import boto3
from StoreApiInterface import StoreApiInterface


class ProductService(StoreApiInterface):
    def __init__(self, event):
        self.event = event

    def get_all_products(self):
        products = []
        s3 = boto3.resource('s3')
        store_names_array = ["rouses", "walmart", "winn_dixie"]
        for store_name in store_names_array:
            key = os.getenv('S3_JSON_FOLDER_NAME') + "/" + store_name + "_products.json"
            s3_object = s3.Object(os.getenv('S3_BUCKET_NAME'), key)
            products.append(s3_object.get()['Body'].read().decode('utf-8'))

        return products

    def get_product_by_id(self):
        print("Hello2")
