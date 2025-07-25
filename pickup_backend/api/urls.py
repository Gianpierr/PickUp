from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SignupView,
    SportViewSet,
    GameViewSet,
    ParticipationViewSet,
    UserViewSet,
)
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

router = DefaultRouter()
router.register(r'sports', SportViewSet)
router.register(r'games', GameViewSet)
router.register(r'participations', ParticipationViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('', include(router.urls)),

    # JWT endpoints:
    # path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('login/', TokenObtainPairView.as_view(), name='login'),
]