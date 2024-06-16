from django.contrib.auth import logout, login
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.http import JsonResponse, HttpResponse, Http404
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import CreateView
from rest_framework import generics
from game.forms import RegisterUserForm, LoginUserForm
from game.models import Game
from game.serializers import GameSerializer
from django.views.generic import TemplateView


class GameAPIView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def game_page(request):
    if request.method == 'GET' and is_ajax(request):
        user_id = int(request.GET['user_id'])
        time = request.GET['time']
        points = request.GET['points']
        if int(points) > 0:
            dataGame = Game(userName_id=user_id, time_game=time, points_per_game=points)
            dataGame.save()
            print(user_id, time, points)
            data = {
                'res': 'Результаты игры сохранены'
            }
        else:
            data = {
                'res': 'Результаты не сохранены'
            }
        return JsonResponse(data)
    return render(request, 'game/index.html')


class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'game/register.html'
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('home')


class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'game/login.html'

    def get_success_url(self):
        return reverse_lazy('home')


def logout_user(request):
    logout(request)
    return redirect('login')


class UserProfileView(TemplateView):
    template_name = 'game/profile.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            user = get_object_or_404(User, username=self.kwargs.get('username'))
        except User.DoesNotExist:
            raise Http404("Пользователь не найден")
        context['user_profile'] = user
        context['title'] = f"Профиль пользователя {user}"
        return context


def rating_page(request):
    games = Game.objects.all()
    return render(request, 'game/rating.html', {'games': games})
