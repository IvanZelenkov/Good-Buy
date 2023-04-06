from abc import ABCMeta, abstractmethod
from S3Service import S3Service


class FilterStrategyInterface(metaclass=ABCMeta):
    @abstractmethod
    def filter(self, s3_service: S3Service, params: dict) -> list:
        pass
