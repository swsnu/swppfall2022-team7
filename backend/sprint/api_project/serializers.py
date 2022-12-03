from rest_framework import serializers

class RequestCreateProjectSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=20)
    subject = serializers.CharField(max_length=20)
    member_list = serializers.ListField()

class RequestEditProjectSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=20)
    subject = serializers.CharField(max_length=20)
    manager = serializers.IntegerField()
