from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthday = models.DateField(null=True, blank=True)
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
        ('prefer_not_to_say', 'Prefer not to say'),
    ]
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, null=True, blank=True)
    SKILL_LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    skill_level = models.CharField(max_length=20, choices=SKILL_LEVEL_CHOICES, null=True, blank=True)

    @property
    def age(self):
        if not self.birthday:
            return None
        today = date.today()
        age = today.year - self.birthday.year
        if today.month < self.birthday.month or (today.month == self.birthday.month and today.day < self.birthday.day):
            age -= 1
        return age

# Keep your existing models (Sport, Game, Participation, Player)

class Player(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True, blank=True, unique=True)
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

class Sport(models.Model):
    """
    Represents a sport that can be played in the app (e.g., Basketball, Soccer).
    """
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Game(models.Model):
    """
    Represents a game event that users can organize and participate in.
    """

    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    organizer = models.ForeignKey(Profile, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(blank=True)  # Optional additional info about the game
    max_players = models.IntegerField(default=10)  #  Added field

    def __str__(self):
        return f"{self.sport.name} on {self.date} at {self.time}"

class Participation(models.Model):
    """
    Represents a user's participation in a game.
    Links a player (User) to a specific game.
    """

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name="participations"  # used in GameSerializer
    )
    player = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="player_participations"  # different name to avoid conflict
    )

    def __str__(self):
        return f"{self.player.username} in {self.game}"


class Player(models.Model):
    """
    Extends the default Django User model with additional profile information.
    Each Player is linked to exactly one User.
    """
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True, unique=True
    )

    username = models.CharField()

    skill_level = models.CharField(
        max_length=20, null=True, blank=True,
        help_text="Player's self-reported skill level (e.g., Beginner, Intermediate)."
    )
    age = models.IntegerField(null=True, blank=True)
    
    # Gender options
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        null=True,
        blank=True,
        help_text="Player's gender (optional)."
    )

    # New field for sports preference
    preferred_sports = models.ManyToManyField(
        Sport,
        blank=True,
        related_name='preferred_by_players',
        help_text="List of sports this player prefers to play."
    )

    def __str__(self):
        return f"{self.user.username if self.user else 'Anonymous'}"