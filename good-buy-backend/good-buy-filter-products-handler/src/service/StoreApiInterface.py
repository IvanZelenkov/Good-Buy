"""
StoreApiInterface module: provides an abstract interface for interacting with store APIs.
"""

from abc import ABCMeta, abstractmethod


class StoreApiInterface(metaclass=ABCMeta):
    """
    An abstract interface for interacting with store APIs.
    """

    @abstractmethod
    def get_all_products(self) -> dict:
        """
        Return all products from the store.
        """
        pass
