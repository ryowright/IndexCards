from rest_framework import serializers
from cardsui.models import CardSet, Card

class CardListingField(serializers.RelatedField):
    def to_representation(self, value):
        cardValue = value.value
        cardDesc = value.description
        return {"value": cardValue, "description": cardDesc}

class CardSetSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    cards = CardListingField(many=True, read_only=True)
    class Meta:
        model = CardSet
        fields = ["id", "title", "description", "private", "owner", "cards"]

class CardSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Card
        fields = ["id", "cardset", "value", "description", "owner"]
