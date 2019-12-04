from django.contrib import admin
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('login/', views.login),
    url('signup/', views.signup),
    url('reset/', views.reset),
    url('logout/', views.logout),
    url('temp/', views.temp),
    url('get_temp/', views.get_temp)
]
