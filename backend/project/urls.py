from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="Motion API",
      default_version='v1',
      description="Motion API Documentation",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="miri.yoo.dev@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True, # Set to False restrict access to protected endpoints
   permission_classes=(permissions.AllowAny,), # Permissions for docs access
)


urlpatterns = [
    path("backend/admin/", admin.site.urls),
    path("backend/", include('users.urls')),
    path("backend/api/social/posts/", include('posts.urls')),

    # JWT
    path('backend/token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/token/verify/', views.TokenVerifyView.as_view(), name='token_verify'),

    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
