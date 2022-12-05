from rest_framework import serializers

class RequestDocuspacePOSTSerializer(serializers.Serializer):
    name = serializers.CharField()