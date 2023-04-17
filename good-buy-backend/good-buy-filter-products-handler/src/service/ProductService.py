"""
The ProductService module provides a class for interacting with product data
stored in various stores using a common interface.
"""

import json
from StoreApiInterface import StoreApiInterface


class ProductService(StoreApiInterface):
    """
    A class that provides methods to interact with product data in various stores.
    """

    STORE_NAMES = ["rouses", "walmart", "winn_dixie"]

    def __init__(self, s3_service, params: dict):
        """
        Constructs a new ProductService instance.

        Args:
            s3_service: An instance of a class that provides S3-related functionality.
            params: A dictionary of parameters for the ProductService instance.
        """
        self.s3_service = s3_service
        self.params = params

    def get_all_products(self) -> list:
        """
        Gets all products from all stores.

        Returns:
            A list of products.
        """
        return [json.loads(self.s3_service.get_s3_object(store_name))
                for store_name in self.STORE_NAMES]

    def get_product_by_id_and_store_name(self) -> dict:
        """
        Gets a product by ID and store name.

        Returns:
            A dictionary representing the product, or an empty dictionary if no such product exists.
        """
        products = json.loads(self.s3_service.get_s3_object(self.params["store_name"]))
        for product in products:
            if product.get("ID") == self.params["product_id"]:
                return product
        # If no product was found, return an empty dictionary.
        return {}

    def get_identical_products_from_stores(self) -> list:
        """
        Gets all products with the same name from all stores.

        Returns:
            A list of identical products.
        """
        identical_products = []
        for store_name in self.STORE_NAMES:
            products = json.loads(self.s3_service.get_s3_object(store_name))
            for product in products:
                if product.get("Name") == self.params["product_name"]:
                    identical_products.append(product)
        return identical_products

    def filter(self, filter_strategy) -> list:
        """
        Filters products based on the specified filter strategy.

        Args:
            filter_strategy: An instance of a class that provides filtering functionality.

        Returns:
            A list of filtered products.
        """
        return filter_strategy.filter(self.s3_service, self.params)
