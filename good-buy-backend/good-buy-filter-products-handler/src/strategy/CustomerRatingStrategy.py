"""
This module provides an implementation of a filter strategy to filter products by customer rating.
"""

from typing import Dict, List
from FilterStrategyInterface import FilterStrategyInterface


class CustomerRatingStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by customer rating.
    """

    def __init__(self, param_value: str):
        """
        Initializes the CustomerRatingStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "rating" key "[0-5]".
        """
        self.param_value = param_value

    def filter(self, products: List[List[Dict[str, str]]]) -> List[Dict[str, str]]:
        """
        Filters products by customer rating.

        Args:
            products (List[List[Dict[str, str]]]): A nested list of dictionaries
                                                   representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products that match the customer rating criteria.
        """
        try:
            min_rating = float(self.param_value)

            filtered_products = []
            for store_products in products:
                for product in store_products:
                    if float(product.get("rating", 0)) >= min_rating:
                        filtered_products.append(product)

            return filtered_products
        except ValueError as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
