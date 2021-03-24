from django.urls import path

from authApp import views

urlpatterns = [
    path('set-csrf/', views.set_csrf_token, name='Set-CSRF'),
    path('login/', views.login_view, name='Login'),
    path('is-logged-in/', views.CheckAuth.as_view(), name='is-logged-in'),
    path('logout/', views.Logout.as_view(), name='Logout')
]