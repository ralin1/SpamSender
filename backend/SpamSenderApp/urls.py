from django.contrib import admin
from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    # path(r'^admin/', admin.site.urls),
    path('login/', views.login),
    path('signup/', views.signup),
    path('reset/', views.reset),
    path('logout/', views.logout),
    path('temp/', views.temp),
    path('get_template/', views.get_template),
    path('find_user/', views.find_user),
    path('delete_template/', views.delete_template),
    path('send_message/', views.send_message)
]
