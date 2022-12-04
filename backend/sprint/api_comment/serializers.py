from rest_framework import serializers

class RequestCreateCommentPostSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=20)

class RequestEditCommentPutSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=20)