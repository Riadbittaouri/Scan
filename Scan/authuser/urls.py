from django.urls import path
from .views import UserListCreateAPIView, GetUserAPIView, UpdateUserAPIView, DeleteUserAPIView, UserLoginAPIView

urlpatterns = [
    path('create-user/', UserListCreateAPIView.as_view(), name='create_user'),
    path('get-user/<int:pk>/', GetUserAPIView.as_view(), name='get_user'),
    path('update-user/<int:pk>/', UpdateUserAPIView.as_view(), name='update_user'),
    path('delete-user/<int:pk>/', DeleteUserAPIView.as_view(), name='delete_user'),
    path('login/', UserLoginAPIView.as_view(), name='user_login'),
]
