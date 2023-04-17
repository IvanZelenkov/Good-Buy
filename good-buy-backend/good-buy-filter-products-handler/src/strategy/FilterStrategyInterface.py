"""
This module defines the abstract base class FilterStrategyInterface.
"""

from abc import ABCMeta, abstractmethod
from S3Service import S3Service


class FilterStrategyInterface(metaclass=ABCMeta):
    """
    Abstract base class for filtering S3 objects based on a given strategy.
    """

    @abstractmethod
    def filter(self, s3_service: S3Service, params: dict) -> list:
        """
        Filters S3 objects based on a given strategy.

        Args:
            s3_service: An instance of the S3Service class.
            params: A dictionary of parameters used to filter the S3 objects.

        Returns:
            A list of filtered S3 objects.
        """
        pass
