from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Player

class SignupTestCase(TestCase):
    def test_user_and_player_creation(self):
        user = User.objects.create_user(username="testuser", password="password123")
        Player.objects.create(user=user, skill_level="Beginner", age=20, gender="Male")

        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Player.objects.count(), 1)
        self.assertEqual(user.username, "testuser")
