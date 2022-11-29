import json
from django.http import JsonResponse
from .models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class Signup(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.data['email']
            nickname = serializer.data['nickname']
            password = serializer.data['password']
            user = User.objects.create_user(
                email=email, nickname=nickname, password=password)
            user.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class LoginView(APIView):
    def post(self, request):
        user = authenticate(
            email=request.data.get("email"), password=request.data.get("password")
        )
        if user is not None:
            serializer = UserSerializer(user)
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            return Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response({"message": "login failed"}, status=status.HTTP_400_BAD_REQUEST)


def Logout(request):
    return Response({'message': 'success!'})


class UserSearch(APIView):

    def get(self, request, value):
        user = User.objects.filter(
            nickname__contains=value) | User.objects.filter(email__contains=value)
        serializer = UserSerializer(user, many=True)

        return Response(serializer.data)
