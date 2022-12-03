from rest_framework import serializers

class RequestDocuspacePOSTSerializer(serializers.Serializer):
    name = serializers.CharField()

class RequestDocuspaceDetailPOSTSerializer(serializers.Serializer):
    name = serializers.CharField()
    head = serializers.IntegerField()
