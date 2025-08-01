from django.db import models
from django.contrib.auth.models import User

class Sport(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Game(models.Model):
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.sport.name} on {self.date} at {self.time}"

class Participation(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.player.username} in {self.game}"
    
class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, unique=True)
    username = models.CharField()
    skill_level = models.CharField(max_length=20)
    age = models.IntegerField(null=True, blank=True)
    GENDER_CHOICES = [
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)

    def __str__(self):
        return f'{self.username}'



