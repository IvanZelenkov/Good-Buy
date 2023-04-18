"""
This module provides an implementation of a filter strategy to filter
products by price range.
"""

from typing import Dict, Any, List
from FilterStrategyInterface import FilterStrategyInterface


class PriceRangeStrategy(FilterStrategyInterface):
    """
    This class implements the FilterStrategyInterface to filter products by price range.
    """

    def filter(self, products: List[Dict[str, Any]], params: Dict[str, Any]) \
            -> List[Dict[str, Any]]:
        """
        Sorts products from lowest to highest price.

        Args:
            products (List[Dict[str, Any]]): A list of products to be filtered.
            params (Dict[str, Any]): A dictionary containing parameter "priceRange": "[0-X)"

        Returns:
            (List[Dict[str, Any]]): A list of products that match the price range.
        """
        # Split the price range string using "-" separator.
        param_price_range = params.get("priceRange")
        if not param_price_range:
            return products

        try:
            # Extracting the lower and upper bounds of the price range.
            min_price, max_price = param_price_range.split("-")

            # strip() method removes any leading and trailing whitespace
            # characters from a string.
            # int() converts the resulting string values to integers.
            lower_bound = int(min_price.strip())
            upper_bound = int(max_price.strip())

            # Filtering the products based on their price,
            # keeping only those within the price range.
            filtered_products = []
            for product in products:
                price = product.get("price")
                if price is None:
                    continue
                if lower_bound <= price <= upper_bound:
                    filtered_products.append(product)

            return filtered_products
        except (ValueError, TypeError) as error:
            raise ValueError(f"Invalid input parameter: {error}") from error
