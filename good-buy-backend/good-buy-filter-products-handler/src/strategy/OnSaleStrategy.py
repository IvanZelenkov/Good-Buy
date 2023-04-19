"""
This module provides an implementation of a filter strategy to filter products by sale.
"""

from typing import Dict, List
from FilterStrategyInterface import FilterStrategyInterface


class OnSaleStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by sale.
    """

    def __init__(self, param_value: str):
        """
        Initializes the OnSaleStrategy with the given param value.

        Args:
            param_value (str):
                A string containing the value of the "onSale" key "true".
        """
        self.param_value = param_value

    def filter(self, products: List[List[Dict[str, str]]]) -> List[Dict[str, str]]:
        """
        Filters products by clearance.

        Args:
            products (List[List[Dict[str, str]]]): A nested list of dictionaries
                                                   representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products that match the clearance criteria.
        """
        try:
            filtered_products = []
            for store_products in products:
                for product in store_products:
                    if product["on_sale"] == self.param_value:
                        filtered_products.append(product)

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
