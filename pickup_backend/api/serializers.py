from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sport, Game, Participation

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

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
    """ Serializer for User model """
    full_name = serializers.SerializerMethodField() #figure out what this does
    class Meta:
        model = User
        fields = [
            "username",
            "email", 
            "first_name", 
            "last_name",
            "full_name",
            "email",
            "is_staff",
            "is_active",
            "date_joined",
            "last_login"
        ]
        

       


