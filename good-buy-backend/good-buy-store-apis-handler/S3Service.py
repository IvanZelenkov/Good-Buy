import os


class S3Service:
    def __init__(self, s3):
        self.s3 = s3

    def get_s3_object(self, store_name):
        key = os.getenv('S3_JSON_FOLDER_NAME') + "/" + store_name + "_products.json"
        s3_object = self.s3.Object(os.getenv('S3_BUCKET_NAME'), key)
        return s3_object.get()["Body"].read().decode("utf-8")
