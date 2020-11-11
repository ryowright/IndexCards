from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import permissions, generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer

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

class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer               # specifying serializer to use on incoming data

    def post(self, request):                            # def post request function
        serializer = self.get_serializer(data=request.data) # applies RegisterSerializer to incoming request data
        serializer.is_valid(raise_exception=True)       # checks if data is valid (checks if it was passed the proper fields with proper format)
        user = serializer.save()                        # calling save will create a new User model instance and return it (stored in variable new_user)
        return Response({                               # Response returned after receiving post request from frontend with valid data
            "user": UserSerializer(user, context=self.get_serializer_context()).data,          # returns serialized (jsonified) fields (specified in UserSerializer) of the newly created user (id, username, email)
            "token": AuthToken.objects.create(user)[1]  # creates token for new user to allow immediate login after successful registration
        })  # the [1] is needed but I don't know why