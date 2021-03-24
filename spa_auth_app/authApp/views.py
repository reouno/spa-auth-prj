import json
import logging

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from authApp.serializers import UserSerializer
from users.models import CustomUser

logger = logging.getLogger('dev.debug')


@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({'detail': 'CSRF cookie set'}, status=status.HTTP_200_OK)


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    if username is None or password is None:
        return JsonResponse({
            'errors': {
                '__all__': 'Please enter both username and password'
            }
        }, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=username, password=password)
    if user is not None:
        user_detail: CustomUser = CustomUser.objects.get_by_natural_key(username=user)
        logger.debug(user_detail)
        login(request, user)
        return JsonResponse({
            'detail': 'Success',
            'user': UserSerializer(user_detail).data,
        })

    return JsonResponse({
        'detail': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)


class CheckAuth(APIView):
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        user_detail: CustomUser = CustomUser.objects.get_by_natural_key(username=request.user)
        return Response({
            'detail': 'Success',
            'user': UserSerializer(user_detail).data,
        }, status=status.HTTP_200_OK)


class Logout(APIView):
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        logger.debug(f'リクエスト: {request}')
        logout(request)
        return Response(status=status.HTTP_200_OK)
