from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Game(models.Model):
    userName = models.ForeignKey(User, on_delete=models.CASCADE)
    time_game = models.CharField(max_length=50)
    points_per_game = models.IntegerField(default=1)
    game_date = models.DateTimeField(auto_now_add=True)
