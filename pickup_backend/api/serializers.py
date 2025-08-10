from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sport, Game, Participation, Profile



class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    skill_level = serializers.ChoiceField(choices=Profile.SKILL_LEVEL_CHOICES, allow_blank=True, required=False)

    class Meta:
        model = Profile
        fields = ['birthday', 'gender', 'skill_level', 'age']


class RegisterSerializer(serializers.ModelSerializer):
    first_name=serializers.CharField(write_only=True, required=False)
    last_name=serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True)
    birthday = serializers.DateField(write_only=True, required=False)
    gender = serializers.ChoiceField(choices=Profile.GENDER_CHOICES, write_only=True, required=False)
    skill_level = serializers.ChoiceField(choices=Profile.SKILL_LEVEL_CHOICES, write_only=True, required=False)
    age = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'birthday', 'gender', 'skill_level', 'age']

    def create(self, validated_data):
        birthday = validated_data.pop('birthday', None)
        gender = validated_data.pop('gender', None)
        skill_level = validated_data.pop('skill_level', None)
        age = validated_data.pop('age', None)
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        # Create associated Profile with extra fields
        Profile.objects.create(
            user=user,
            birthday=birthday,
            gender=gender,
            skill_level=skill_level,
            age=age
        )

        return user




class UserSerializer(serializers.ModelSerializer):
    """ Serializer for User model """
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'full_name', 'date_joined']
        read_only_fields = ['date_joined']
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username


