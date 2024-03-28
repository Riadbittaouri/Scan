from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer, UserLoginSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate,login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .backends import CustomUserBackend
import logging




class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUserAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateUserAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DeleteUserAPIView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

logger = logging.getLogger(__name__)

class UserLoginAPIView(APIView):

    def post(self, request):
        Matricule = request.data.get('Matricule')
        password = request.data.get('password')
      
        if Matricule is None or password is None:
            # Log an error message
            logger.error('Matricule and password are required')
            return JsonResponse({'error': 'Matricule and password are required'}, status=400)

        # Authenticate the user
        user = authenticate(request, Matricule=Matricule, password=password)
        # Check if authentication was successful
        if user is not None:

            # Log a success message
            logger.info('User authentication successful')
            # Log the user in
            login(request, user)
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, status=200)
        else:
            # Log an error message
            logger.error('Invalid Matricule or password')
            # Authentication failed
            return JsonResponse({'error': 'Invalid Matricule or password'}, status=401)
