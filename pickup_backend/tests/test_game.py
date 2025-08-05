from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Game, Sport

class GameTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="host", password="password123")
        self.sport = Sport.objects.create(name="Soccer")

    def test_game_creation(self):
        game = Game.objects.create(
            sport=self.sport,
            organizer=self.user,
            location="Downtown Park",
            date="2025-07-20",
            time="18:00:00",
        )
        self.assertEqual(Game.objects.count(), 1)
        self.assertEqual(game.location, "Downtown Park")
        self.assertEqual(game.organizer.username, "host")
