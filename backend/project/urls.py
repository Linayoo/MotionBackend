from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views

urlpatterns = [
    path("backend/admin/", admin.site.urls),
    path("backend/", include('users.urls')),

    # JWT
    path('token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', views.TokenVerifyView.as_view(), name='token_verify'),
]

