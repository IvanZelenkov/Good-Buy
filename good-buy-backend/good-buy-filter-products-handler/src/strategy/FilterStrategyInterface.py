"""
This module defines the abstract base class FilterStrategyInterface.
"""

from abc import ABCMeta, abstractmethod
from typing import Dict, List


class FilterStrategyInterface(metaclass=ABCMeta):
    """
    Abstract base class for filtering products based on a given strategy.
    """

    @abstractmethod
    def filter(self, products: List[List[Dict[str, str]]]) -> List[Dict[str, str]]:
        """
        Filters products based on a given strategy.

        Args:
            products (List[List[Dict[str, str]]]): A list of products to be filtered.

        Returns:
            List[Dict[str, str]]: A list of filtered products.
        """
        pass
