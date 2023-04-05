import json
from StoreApiInterface import StoreApiInterface


class ProductService(StoreApiInterface):
    def __init__(self, s3_service, event):
        self.s3_service = s3_service
        self.event = event

    def get_all_products(self):
        products = []
        store_names_array = ["rouses", "walmart", "winn_dixie"]
        for store_name in store_names_array:
            products.append(json.loads(self.s3_service.get_s3_object(store_name)))
        return products

    def get_product_by_id_and_store_name(self):
        products = json.loads(self.s3_service.get_s3_object(self.event["store_name"]))
        for product in products:
            if product.get("ID") == self.event["product_id"]:
                return product
        else:
            return {}

    def get_products_by_store_name(self):
        return json.loads(self.s3_service.get_s3_object(self.event["store_name"]))

    def get_identical_products_from_stores(self):
        identical_products = []
        store_names_array = ["rouses", "walmart", "winn_dixie"]
        for store_name in store_names_array:
            products = json.loads(self.s3_service.get_s3_object(store_name))
            for product in products:
                if product.get("Name") == self.event["product_name"]:
                    identical_products.append(product)
        return identical_products
