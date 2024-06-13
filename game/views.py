from django.contrib.auth import logout, login
from django.contrib.auth.views import LoginView
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from rest_framework import generics
from game.forms import RegisterUserForm, LoginUserForm, DataGameForm
from game.models import Game
from game.serializers import GameSerializer


class GameAPIView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def game_page(request):
    form = DataGameForm()
    if request.method == 'POST' and is_ajax(request):
        form = DataGameForm(request.POST)
        print(form)
        user = request.POST.get('userName')
        print(user)
        if form.is_valid():
            userName = form.cleaned_data['name']
            form.save()
            return JsonResponse({"userName": userName}, status=200)
        else:
            errors = form.errors.as_json()
            return JsonResponse({"errors": errors}, status=400)
    return render(request, 'game/index.html', {'form': form})


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
