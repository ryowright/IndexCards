from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from cardsui.models import Card, CardSet
from indexapi.serializers import CardSetSerializer, CardSerializer
from knox.auth import TokenAuthentication
from rest_framework.authentication import SessionAuthentication


class CardSetViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CardSetSerializer

    def get_queryset(self):
        return self.request.user.cardsets.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CardViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CardSerializer

    def get_queryset(self):
        return self.request.user.cards.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)