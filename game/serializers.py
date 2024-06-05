from rest_framework import serializers

from game.models import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('userName', 'game_date')
