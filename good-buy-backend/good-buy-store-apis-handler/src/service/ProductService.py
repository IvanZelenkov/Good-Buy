import json
from StoreApiInterface import StoreApiInterface


class ProductService(StoreApiInterface):
    STORE_NAMES = ["rouses", "walmart", "winn_dixie"]

    def __init__(self, s3_service, event: dict):
        self.s3_service = s3_service
        self.event = event

    def get_all_products(self) -> list:
        return [json.loads(self.s3_service.get_s3_object(store_name)) for store_name in self.STORE_NAMES]

    def get_product_by_id_and_store_name(self) -> dict:
        products = json.loads(self.s3_service.get_s3_object(self.event["store_name"]))
        for product in products:
            if product.get("ID") == self.event["product_id"]:
                return product
        else:
            return {}

    def get_identical_products_from_stores(self) -> list:
        identical_products = []
        for store_name in self.STORE_NAMES:
            products = json.loads(self.s3_service.get_s3_object(store_name))
            for product in products:
                if product.get("Name") == self.event["product_name"]:
                    identical_products.append(product)
        return identical_products

    def filter(self, filter_strategy) -> list:
        return filter_strategy.filter(self.s3_service, self.event)
