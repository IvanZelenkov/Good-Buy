"""
This module provides an implementation of a filter strategy to filter
products by price range.
"""

from typing import Dict, List, Any
from strategy.FilterStrategyInterface import FilterStrategyInterface


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

    def filter(self, products: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Filters products by price range.

        Args:
            products (List[Dict[str, Any]]): A list of dictionaries
                                             representing products to be filtered.

        Returns:
            List[Dict[str, Any]]: A list of products that match the price range.
        """
        try:
            # Split the price range string using "-" separator.
            # Extracting the lower and upper bounds of the price range.
            min_price, max_price = self.param_value.split("-")

            # strip() method removes any leading and trailing whitespace
            # characters from a string.
            # int() converts the resulting string values to integers.
            lower_bound = float(min_price.strip())
            upper_bound = float(max_price.strip())

            # Filtering the products based on their price,
            # keeping only those within the price range.
            filtered_products = []
            for product in products:
                price = float(product.get("price"))
                if price is None:
                    continue
                if lower_bound <= price <= upper_bound:
                    filtered_products.append(product)

            return filtered_products
        except (ValueError, TypeError) as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
