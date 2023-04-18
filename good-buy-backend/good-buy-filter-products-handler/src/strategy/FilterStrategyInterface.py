"""
This module defines the abstract base class FilterStrategyInterface.
"""

from abc import ABCMeta, abstractmethod
from typing import Dict, Any, List


class FilterStrategyInterface(metaclass=ABCMeta):
    """
    Abstract base class for filtering products based on a given strategy.
    """

    @abstractmethod
    def filter(self, products: list, params: dict) -> List[Dict[str, Any]]:
        """
        Filters products based on a given strategy.

        Args:
            products (list): A list of products to be filtered.
            params (dict): A dictionary of parameters used to filter the products.

        Returns:
            (List[Dict[str, Any]]): A list of filtered products.
        """
        pass
