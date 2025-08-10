from django.test import TestCase
from django.contrib.auth.models import User
from .models import Sport, Game, Participation, Player
from datetime import date, time
# Create your tests here.

class SportModelTests(TestCase):
    def test_sport_creation_str(self):
        sport = Sport.objects.create(name="Basketball")
        self.assertEqual(str(sport), "Basketball")
        self.assertEqual(Sport.objects.count(),1)

class GameModelTests(TestCase):
    def set_up(self):
        self.user = User.objects.create_user(username="org", password="password")
        self.sport = Sport.objects.create(name="Soccer")

    def test_game_creation_and_str(self):
        g = Game.objects.create(
            sport=self.sport,
            organizer=self.user, 
            location="Central Park",
            date=date(2025, 8, 1),
            time=time(18,0),
            notes="Bring your cleats",
        )

        