from rest_framework import serializers
from cardsui.models import Card
from django.contrib.auth.models import User


class CardSerializer(serializers.HyperlinkedModelSerializer):
    cards = serializers.HyperlinkedRelatedField(    # INCORRECT CODE // SHOULD NOT BE HERE
        many=True,                            # Leaving it here out of curiosity
        read_only=True,
        view_name='card-detail'
    )
    owner = serializers.ReadOnlyField(source='owner.username')
    # might need a ReadOnlyField for the 'created' field

    class Meta:
        model = Card
        fields = ['created', 'description', 'value', 'private', 'owner']

    # def create(self, validated_data):
    #    return Card.objects.create(**validated_data) // checking to see if this is really necessary

    def update(self, instance, validated_data):
        # The instance.title/.value/.private/ don't seem to affect the API when removed
        instance.description = validated_data.get(
            'description', instance.title)
        # except make it a little slower to load from what I can tell
        instance.value = validated_data.get('value', instance.value)
        # these parameters don't seem required because the name of the field is already passed
        instance.private = validated_data.get('private', instance.private)
        # as first parameter
        instance.save()
        return instance


class UserSerializer(serializers.HyperlinkedModelSerializer):
    cards = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='card-detail'
    )

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'cards']
