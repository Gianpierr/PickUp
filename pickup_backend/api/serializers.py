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
    host = serializers.CharField(source='organizer.username', read_only=True)  # Show host username
    date = serializers.DateTimeField(write_only=True, required=True)

    # Use sport name for both read/write
    sport = serializers.SlugRelatedField(
    slug_field='name',  # Match on Sport.name
    queryset=Sport.objects.all()    # Enables write via sport name 
)


    class Meta:
        model = Game
        fields = '__all__'
        extra_kwargs = {
            'organizer': {'required': False, 'allow_null': True}
        }

    def create(self, validated_data):
        print("=== SERIALIZER CREATE DEBUG ===")
        print("Validated data:", validated_data)
        
        # Remove organizer if it exists in validated_data (it shouldn't, but just in case)
        validated_data.pop('organizer', None)
        
        datetime_value = validated_data.pop('date')
        validated_data['date'] = datetime_value.date()
        validated_data['time'] = datetime_value.time()
        sport_name = validated_data.pop('sport')
        
        from .models import Sport
        sport = Sport.objects.get(name=sport_name)
        
        # Get a user for testing (you'll replace this with proper auth later)
        from django.contrib.auth.models import User
        user = User.objects.first()
        organizer = user.profile
        
        game = Game.objects.create(
            sport=sport,
            organizer=organizer,
            **validated_data
        )
        return game
    
    def get_currentPlayers(self, obj):
        """ Return the current number of players in the game """
        return obj.participations.count()
    
    def get_participants(self, obj):
        """ Return all participants in a given game """
        return [participation.player.username for participation in obj.participations.all()]

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