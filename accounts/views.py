from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils import timezone
import json

from .models import User

# Create your views here.

@ensure_csrf_cookie
@require_http_methods(["POST"])
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    
    try:
        user = User.objects.get(username=username)
        
        # Check if account is locked
        if user.failed_login_attempts >= 5:
            last_attempt = user.last_login_attempt
            if last_attempt and (timezone.now() - last_attempt).seconds < 300:  # 5 minutes lockout
                return JsonResponse({
                    'error': 'Account is locked. Please try again in a few minutes.'
                }, status=403)
            else:
                # Reset counter after lockout period
                user.failed_login_attempts = 0
                user.save()
        
        # Attempt authentication
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            
            # Reset failed attempts on successful login
            user.failed_login_attempts = 0
            user.last_login_attempt = timezone.now()
            user.save()
            
            return JsonResponse({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role,
                'firstName': user.first_name,
                'lastName': user.last_name,
            })
        else:
            # Increment failed attempts
            user = User.objects.get(username=username)
            user.failed_login_attempts += 1
            user.last_login_attempt = timezone.now()
            user.save()
            
            return JsonResponse({
                'error': 'Invalid credentials'
            }, status=401)
            
    except User.DoesNotExist:
        return JsonResponse({
            'error': 'Invalid credentials'
        }, status=401)

@require_http_methods(["POST"])
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Successfully logged out'})
