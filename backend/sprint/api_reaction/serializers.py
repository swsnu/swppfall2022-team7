from rest_framework import serializers

class RequestReactionPostSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=20)