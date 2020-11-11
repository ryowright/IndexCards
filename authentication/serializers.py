from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

#class LoginSerializer(serializers.Serializer):
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        new_user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        
        return new_user