from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, generics, filters
from .serializers import (
    SignupSerializer,
    SportSerializer,
    GameSerializer,
    ParticipationSerializer,
    UserSerializer,
    ProfileSerializer
)
from .models import Sport, Game, Participation, Profile
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend


class SignupView(APIView):
    """Handles user signup functionality"""

    def post(self, request):
        """
        Create a new user account.
        - Expects data matching SignupSerializer fields
        - Returns 201 on success or 400 on failure
        """
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SportViewSet(viewsets.ModelViewSet):
    """Provides CRUD operations for sports"""

    queryset = Sport.objects.all()
    serializer_class = SportSerializer


class GameViewSet(viewsets.ModelViewSet):
    """
    Provides CRUD operations for games.
    Includes organizer username, sport name,
    current players, max players, and participants.
    """

    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new game with the logged-in user as the organizer.
        """
        user = request.user
        data = request.data.copy()
        data['organizer'] = user.id  # link game to logged-in user
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ParticipationViewSet(viewsets.ModelViewSet):
    """
    Provides CRUD operations for game participations.
    """

    queryset = Participation.objects.all()
    serializer_class = ParticipationSerializer

    def create(self, request, *args, **kwargs):
        """
        Add the logged-in user to a game participation.
        """
        user = request.user
        game_id = request.data.get("game_id")
        if not game_id:
            return Response({"error": "game_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            return Response({"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND)

        # Prevent duplicate participation
        if Participation.objects.filter(game=game, player=user).exists():
            return Response({"error": "Already joined this game"}, status=status.HTTP_400_BAD_REQUEST)

        Participation.objects.create(game=game, player=user)
        return Response({"message": "Successfully joined the game"}, status=status.HTTP_201_CREATED)


class UsersView(APIView):
    """Handles fetching all users in the system"""

    def get(self, request):
        """
        Retrieve all users.
        - Returns serialized list of all users
        """
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class CreateGameView(APIView):
    """Handles creating new games"""

    def post(self, request):
        """
        Create a new game instance.
        - Expects data matching GameSerializer fields
        - Returns 201 on success or 400 on failure
        """
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Game created successfully", "game": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Player profiles.

    Supports listing, retrieving, creating, and updating Players,
    including their preferred sports.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['skill_level', 'age', 'gender', 'preferred_sports']
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

    

    
    


