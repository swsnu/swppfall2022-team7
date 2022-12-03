from rest_framework import serializers

class RequestTaskPOSTSerializer(serializers.Serializer):
    assignee = serializers.IntegerField()
    name = serializers.CharField()
    content = serializers.CharField()
    untilAt = serializers.CharField()

class RequestTaskDocuPOSTSerializer(serializers.Serializer):
    documentId = serializers.IntegerField()
