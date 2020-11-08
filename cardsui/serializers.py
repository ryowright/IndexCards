from rest_framework import serializers
from cardsui.models import Card, CardSet
from django.contrib.auth.models import User


class CardSerializer(serializers.HyperlinkedModelSerializer):
    # used to link to a detail view for each card in card list
    card = serializers.HyperlinkedIdentityField(view_name='card-detail')
    owner = serializers.ReadOnlyField(source='owner.username')
    # cardset = serializers.PrimaryKeyRelatedField(  # cardset is already defined in Card model
    #    many=True,
    #    read_only=True)

    class Meta:
        model = Card
        fields = ['card', 'id', 'value', 'description', 'cardset', 'owner']

    # def create(self, validated_data):
    #    return Card.objects.create(**validated_data) // checking to see if this is really necessary

    def update(self, instance, validated_data):
        instance.description = validated_data.get(
            'description', instance.description)
        instance.value = validated_data.get('value', instance.value)
        instance.save()
        return instance

        # The instance.title/.value/.private/ don't seem to affect the API when removed
        # except make it a little slower to load from what I can tell
        # these parameters don't seem required because the name of the field is already passed
        # as first parameter


class CardSetSerializer(serializers.HyperlinkedModelSerializer):
    #cardset = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    cardset = serializers.HyperlinkedIdentityField(view_name='cardset-detail')
    owner = serializers.ReadOnlyField(source='owner.username')
    cards = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='card-detail'
    )

    def update(self, instance, validated_data):
        instance.description = validated_data.get(
            'description', instance.description)
        instance.title = validated_data.get('title', instance.title)
        instance.private = validated_data.get('private', instance.private)
        instance.save()
        return instance
        # Later add an option to update which cards for an owner belong to the cardset

    class Meta:
        model = CardSet
        fields = ['cardset', 'id', 'title', 'description',
                  'private', 'cards', 'owner']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    cardsets = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='cardset-detail'
    )

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'cardsets']
