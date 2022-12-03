from rest_framework import serializers

class BaseResponse(serializers.Serializer):
    pass

class BaseResponseError(serializers.Serializer):
    pass
