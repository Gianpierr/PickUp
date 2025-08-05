from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Game, Sport, Participation

class ParticipationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="player", password="password123")
        self.sport = Sport.objects.create(name="Soccer")
        self.game = Game.objects.create(
            sport=self.sport,
            organizer=self.user,
            location="Downtown Park",
            date="2025-07-20",
            time="18:00:00",
        )

    def test_join_game(self):
        Participation.objects.create(player=self.user, game=self.game)
        self.assertEqual(Participation.objects.count(), 1)
        self.assertEqual(self.game.participations.count(), 1)
        self.assertEqual(self.game.participations.first().player.username, "player")
