from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from game.models import Game
from game.serializers import GameSerializer


class GameAPIView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


def game_page(request):
    return render(request, 'game/index.html')
