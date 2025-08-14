from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sport, Game, Participation, Profile
from datetime import date

class SignupSerializer(serializers.Serializer):
    """
    Serializer for user signup.
    Handles creating a new User with email as username if not explicitly provided.
    """
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    birthday = serializers.DateField(required=True)
    gender = serializers.ChoiceField(choices=Profile.GENDER_CHOICES, required=True)
    skill_level = serializers.ChoiceField(choices=Profile.SKILL_LEVEL_CHOICES, required=True)

   

    def create(self, validated_data):

        birthday = validated_data.pop('birthday')
        gender = validated_data.pop('gender')
        skill_level = validated_data.pop('skill_level')

        # Default username to email if not provided
        if 'username' not in validated_data or not validated_data['username']:
            validated_data['username'] = validated_data['email']

        user = User.objects.create_user(**validated_data)
        

        # Calculate age from birthday
        today = date.today()
        age = today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))

        profile = Profile.objects.create(
            user=user,
            birthday=birthday,
            gender=gender,
            skill_level=skill_level,

        )

        return user


class SportSerializer(serializers.ModelSerializer):
    """
    Serializer for the Sport model.
    """
    class Meta:
        model = Sport
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    currentPlayers = serializers.SerializerMethodField()
    participants = serializers.SerializerMethodField()
    sport = serializers.CharField(source='sport.name', read_only=True)  # Show sport name
    host = serializers.CharField(source='organizer.username', read_only=True)  # Show host username

    class Meta:
        model = Game
        fields = '__all__'

    def get_currentPlayers(self, obj):
        return obj.participations.count()

    def get_participants(self, obj):
        return [p.player.username for p in obj.participations.all()]


class ParticipationSerializer(serializers.ModelSerializer):
    player = serializers.StringRelatedField(read_only=True)
    game = serializers.StringRelatedField(read_only=True)
    game_id = serializers.PrimaryKeyRelatedField(
        queryset=Game.objects.all(), source="game", write_only=True
    )

    class Meta:
        model = Participation
        fields = ['id', 'player', 'game', 'game_id']

class ProfileSerializer(serializers.ModelSerializer):
    """ Serializer for Profile model """
    class Meta:
        model = Profile
        fields = ['id', 'user', 'birthday', 'gender', 'skill_level', 'age']
        read_only_fields = ['age']

    def update(self, instance, validated_data):
        """ Update profile instance with validated data. """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
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