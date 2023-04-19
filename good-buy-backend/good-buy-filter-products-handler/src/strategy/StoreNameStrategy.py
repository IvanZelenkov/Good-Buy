"""
This module provides an implementation of a filter strategy to filter products by store name.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class StoreNameStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by store name.
    """

    def __init__(self, param_value: str):
        """
        Initializes the StoreNameStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the
                               "storeName" key "rouses|walmart|winn_dixie".
        """
        self.param_value = param_value

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filters products by store name.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.

        Returns:
            (List[Dict[str, Any]]): A list of products that match the store name criteria.
        """
        if not self.param_value:
            return products

        try:
            filtered_products = [product for product in products
                                 if product.get("store_name") == self.param_value]
            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
