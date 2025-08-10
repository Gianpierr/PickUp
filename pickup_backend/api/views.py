from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, generics, filters
from .serializers import (

    SportSerializer, 
    GameSerializer, 
    ParticipationSerializer,
    UserSerializer,
    RegisterSerializer,
    ProfileSerializer
)
from .models import Sport, Game, Participation, Profile
from django.contrib.auth.models import User
# from django_filters.rest_framework import DjangoFilterBackend


class SportViewSet(viewsets.ModelViewSet):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ParticipationViewSet(viewsets.ModelViewSet):
    queryset = Participation.objects.all()
    serializer_class = ParticipationSerializer

class UsersView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class CreateGameView(APIView):
    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Game created successfully", "game": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "message": "User registered successfully",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                }
            },
            status=status.HTTP_201_CREATED
        )

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['skill_level', 'age', 'gender']
    search_fields = ['username', 'skill_level']



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
    

    def retrieve(self, request, pk=None):
        """ Return a specific user """
        try:
            user = self.get_object()   # get the user 
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    

    
    


