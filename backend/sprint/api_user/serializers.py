from rest_framework import serializers

class RequestSignupPOSTSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=20)
    
class ResponseSignupPOSTSerializer200(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.CharField()
    
class ResponseSignupPOSTSerializer401(serializers.Serializer):
    pass
