from rest_framework import serializers

class RequestReactionPostSerializer(serializers.Serializer):
    emoji = serializers.CharField(max_length=20)
