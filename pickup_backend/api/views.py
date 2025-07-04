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
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field="username"

    @action(detail=True, methods=['get'])
    def profile(self, request, pk=None):
        """ Custom profile endpoint: GET /"""
        user = self.get_object()
    def retrieve(self, request, pk=None):
        return super().retrieve(request, pk)
    
    def create(self, request, pk=None):
        pass
    
    def update(self, request, pk=None):
        return super().update(request, pk)
    
    def destroy(self, request, pk=None):
        """ DELETE /users/{id}/ - Delete user """
        return super().destroy(request, pk)
    

    





# @action(detail=True, methods=['get'])
# def profile(self, request, pk=None):
    
#     user = self.get_object()

#     profile_data = {
#         'user info': self.get_serializer(user).data,
#         ;u
#     }

