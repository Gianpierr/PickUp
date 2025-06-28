from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SignupView,
    SportViewSet,
    GameViewSet,
    ParticipationViewSet
)

router = DefaultRouter()
router.register(r'sports', SportViewSet)
router.register(r'games', GameViewSet)
router.register(r'participations', ParticipationViewSet)

urlpatterns = [
    path('users/', UsersView.as_view(),  name='users')
    path('signup/', SignupView.as_view(), name='signup'),
    path('', include(router.urls)),
]