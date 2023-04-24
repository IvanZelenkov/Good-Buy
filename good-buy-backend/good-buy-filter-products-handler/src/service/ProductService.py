"""
This module defines the ProductService class, which provides functionality for
filtering products based on various strategies.
"""
import os
import sys
import json
from typing import Dict, List, Any

current_dir = os.path.dirname(os.path.realpath(__file__))
src = os.path.dirname(current_dir)
sys.path.append(src)

from service.StoreApiInterface import StoreApiInterface
from service.S3Service import S3Service
from strategy.FilterStrategyInterface import FilterStrategyInterface


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

    def get_all_products(self) -> List[Dict[str, Any]]:
        """
        Gets all products from all stores.

        Returns:
            List[Dict[str, Any]]:: A list of dictionaries representing the products.
        """
        products = []
        for store_name in self.STORE_NAMES:
            store_products = json.loads(self.s3_service.get_s3_object(store_name))
            products.extend(store_products)

        return products

    def filter(self, filter_strategies: List[FilterStrategyInterface]) -> List[Dict[str, Any]]:
        """
        Filters products based on the specified filter strategies.

        Args:
            filter_strategies (List[FilterStrategyInterface]): A list of instances of strategy
                                                               classes that provide filtering
                                                               functionality.

        Returns:
            List[Dict[str, Any]]: A list of filtered products.
        """
        # Load all products from S3
        products = self.get_all_products()

        # Apply each filter strategy in sequence to the products
        for filter_strategy in filter_strategies:
            products = filter_strategy.filter(products)

        return products
