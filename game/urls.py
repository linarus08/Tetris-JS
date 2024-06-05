from django.urls import path, include

from game import views

urlpatterns = [
    path('', views.game_page),
    path('game/auth/', include('rest_framework.urls')),
]