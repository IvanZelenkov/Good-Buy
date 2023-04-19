"""
This module provides an implementation of a filter strategy to filter
products by price range.
"""

from typing import Dict, List
from FilterStrategyInterface import FilterStrategyInterface


class PriceRangeStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by price range.
    """

    def __init__(self, param_value: str):
        """
        Initializes the PriceRangeStrategy with the given param value.

        Args:
            param_value (str): A string containing the value of the "price" key "[0-x)".
        """
        self.param_value = param_value

    def filter(self, products: List[List[Dict[str, str]]]) -> List[Dict[str, str]]:
        """
        Filters products by price range.

        Args:
            products (List[List[Dict[str, str]]]): A nested list of dictionaries
                                                   representing products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of products that match the price range.
        """
        try:
            # Split the price range string using "-" separator.
            # Extracting the lower and upper bounds of the price range.
            min_price, max_price = self.param_value.split("-")

            # strip() method removes any leading and trailing whitespace
            # characters from a string.
            # int() converts the resulting string values to integers.
            lower_bound = int(min_price.strip())
            upper_bound = int(max_price.strip())

            # Filtering the products based on their price,
            # keeping only those within the price range.
            filtered_products = []
            for store_products in products:
                for product in store_products:
                    price = int(product.get("price"))
                    if price is None:
                        continue
                    if lower_bound <= price <= upper_bound:
                        filtered_products.append(product)

            return filtered_products
        except (ValueError, TypeError) as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
