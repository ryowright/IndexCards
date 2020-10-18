from rest_framework import serializers
from cardsui.models import Card
from django.contrib.auth.models import User


class CardSerializer(serializers.HyperlinkedModelSerializer):
    card = serializers.HyperlinkedIdentityField(view_name='card-detail')    # used to link to a detail view for each card in card list
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Card
        fields = ['card', 'value', 'description', 'private', 'owner']

    # def create(self, validated_data):
    #    return Card.objects.create(**validated_data) // checking to see if this is really necessary

    def update(self, instance, validated_data):
        instance.description = validated_data.get(
            'description', instance.description)
        instance.value = validated_data.get('value', instance.value)
        instance.private = validated_data.get('private', instance.private)
        instance.save()
        return instance

        # The instance.title/.value/.private/ don't seem to affect the API when removed
        # except make it a little slower to load from what I can tell
        # these parameters don't seem required because the name of the field is already passed
        # as first parameter


class UserSerializer(serializers.HyperlinkedModelSerializer):
    cards = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='card-detail'
    )

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'cards']
