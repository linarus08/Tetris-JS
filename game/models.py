from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Game(models.Model):
    userName = models.OneToOneField(User, on_delete=models.CASCADE)
    game_date = models.DateTimeField(auto_now_add=True)
    time_start = models.DateTimeField()
    time_stop = models.DateTimeField()
    points_per_game = models.IntegerField()
