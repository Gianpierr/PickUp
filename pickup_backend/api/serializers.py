from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sport, Game, Participation, Player


class SignupSerializer(serializers.ModelSerializer):
    """
    Serializer for user signup.
    Handles creating a new User with username, email, password, first name, and last name.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        # Create a new user with hashed password
        return User.objects.create_user(**validated_data)


class SportSerializer(serializers.ModelSerializer):
    """
    Serializer for the Sport model.
    """
    class Meta:
        model = Sport
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    """
    Serializer for the Game model.
    """
    sport = SportSerializer(read_only=True)  # Nested serializer for sport details

    class Meta:
        model = Game
        fields = '__all__'


class ParticipationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Participation model.
    Links a player to a game.
    """
    player = serializers.StringRelatedField(read_only=True)  # Displays username instead of ID
    game = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Participation
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    """
    Handles new user registration with password hashing.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create a user while securely storing the password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user


class PlayerSerializer(serializers.ModelSerializer):
    """
    Serializer for Player profile information.
    Includes skill level, age, gender, and preferred sports.
    Allows users to set or update their preferred sports.
    """
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    preferred_sports = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Sport.objects.all(),
        required=False,
        help_text="List of sport IDs the player prefers."
    )

    class Meta:
        model = Player
        fields = ['id', 'user', 'skill_level', 'age', 'gender', 'preferred_sports']

    def create(self, validated_data):
        """
        Create a new Player profile with optional preferred sports.
        """
        preferred_sports_data = validated_data.pop('preferred_sports', None)
        player = Player.objects.create(**validated_data)

        if preferred_sports_data:
            player.preferred_sports.set(preferred_sports_data)

        return player

    def update(self, instance, validated_data):
        """
        Update an existing Player profile, including preferred sports if provided.
        """
        preferred_sports_data = validated_data.pop('preferred_sports', None)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update preferred sports
        if preferred_sports_data is not None:
            instance.preferred_sports.set(preferred_sports_data)

        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model with additional details.
    Includes full name and date joined.
    """
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'full_name', 'date_joined']
        read_only_fields = ['date_joined']

    def get_full_name(self, obj):
        # Return first and last name if available, otherwise fallback to username
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username