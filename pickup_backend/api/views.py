from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .serializers import (
    SignupSerializer,
    SportSerializer, 
    GameSerializer, 
    ParticipationSerializer,
    UserSerializer
)
from .models import Sport, Game, Participation
from django.contrib.auth.models import User


class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SportViewSet(viewsets.ModelViewSet):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ParticipationViewSet(viewsets.ModelViewSet):
    queryset = Participation.objects.all()
    serializer_class = ParticipationSerializer




class UserViewSet(viewsets.ModelViewSet):
    """ User view set for listing and retrieving users """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    
    def list(self, request, *args, **kwargs):
        """ 
        Return a list of users
        api endpoint: GET api/users/
        """
        return super().list(request, *args, **kwargs)

    
    


