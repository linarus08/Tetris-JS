from django.http import HttpResponse
from django.shortcuts import render


def game_page(request):
    return render(request, 'game/index.html')
