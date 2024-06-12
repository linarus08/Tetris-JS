from django.urls import path, include

from game import views
from game.views import GameAPIView, RegisterUser, LoginUser, logout_user

urlpatterns = [
    path('', views.game_page, name='home'),
    path('auth/', include('rest_framework.urls')),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('logout/', logout_user, name='logout'),
    path('api/v1/gamelist/', GameAPIView.as_view()),

]