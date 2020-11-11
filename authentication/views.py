from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import permissions, generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication
from .serializers import UserSerializer

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # if user is not None: --> login
        login(request, user)
        return super(LoginView, self).post(request, format=None)

class UserAPI(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserSerializer

    def get_object(self):
       return self.request.user
       # self.request.user is an instance of a User model object that is returned