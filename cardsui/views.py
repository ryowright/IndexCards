from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from cardsui.models import Card, CardSet
from cardsui.serializers import CardSerializer, UserSerializer, CardSetSerializer
from cardsui.permissions import IsOwnerOrReadOnly
from knox.auth import TokenAuthentication

# Create your views here.


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    
    # Disables enabling anyone to post in description, value, and private fields
    permission_classes = [IsAuthenticatedOrReadOnly, ]   #, IsPublicOrInvisible]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CardSetViewSet(viewsets.ModelViewSet):
    queryset = CardSet.objects.all()
    serializer_class = CardSetSerializer
    #authentication_classes = [TokenAuthentication, SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# don't want to be able to create users through API
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
