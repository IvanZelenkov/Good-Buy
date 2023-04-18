"""
This module defines the ProductService class, which provides functionality for
filtering products based on various strategies.
"""
import json

from typing import List, Dict, Any
from StoreApiInterface import StoreApiInterface
from FilterStrategyInterface import FilterStrategyInterface
from S3Service import S3Service


class ProductService(StoreApiInterface):
    """
    This class provides functionality for filtering products based on various strategies.

    Attributes:
        STORE_NAMES (List[str]): A list of store names to be used for loading products from S3.
    """

    STORE_NAMES = ["rouses", "walmart", "winn_dixie"]

    def __init__(self, s3_service: S3Service):
        """
        Constructs a new ProductService instance.

        Args:
            s3_service (S3Service): An instance of a class that provides S3-related functionality.
        """
        self.s3_service = s3_service

    def get_all_products(self) -> list:
        """
        Gets all products from all stores.

        Returns:
            (list) A list of products.
        """
        return [json.loads(self.s3_service.get_s3_object(store_name))
                for store_name in self.STORE_NAMES]

    def filter(self, filter_strategies: List[FilterStrategyInterface]) -> List[Dict[str, Any]]:
        """
        Filters products based on the specified filter strategies.

        Args:
            filter_strategies (List[FilterStrategyInterface]): A list of instances of classes
            that provide filtering functionality.

        Returns:
            (List[Dict[str, Any]]): A list of filtered products.
        """
        # Load all products from S3
        products = self.get_all_products()

        # Apply each filter strategy in sequence to the products
        for filter_strategy in filter_strategies:
            products = filter_strategy.filter(products)

        return products
