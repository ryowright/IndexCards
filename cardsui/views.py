from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from cardsui.models import Card
from cardsui.serializers import CardSerializer, UserSerializer
from cardsui.permissions import IsOwnerOrReadOnly

# Create your views here.


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    # Disables enabling anyone to post in description, value, and private fields
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]   #, IsPublicOrInvisible]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# don't want to be able to create users through API
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
