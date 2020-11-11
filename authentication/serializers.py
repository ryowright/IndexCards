from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

#class LoginSerializer(serializers.Serializer):
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']