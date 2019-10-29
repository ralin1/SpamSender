from django.shortcuts import render
import pyrebase
import json
import json.decoder
from django.http import HttpRequest
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

firebase = {
    'apiKey': "AIzaSyAiSYKW1D6KquwC_0LP55C_YhNR9cirin4",
    'authDomain': "spamsender-f8925.firebaseapp.com",
    'databaseURL': "https://spamsender-f8925.firebaseio.com",
    'projectId': "spamsender-f8925",
    'storageBucket': "spamsender-f8925.appspot.com",
    'messagingSenderId': "985000868953",
    'appId': "1:985000868953:web:2d35f601632ea6f22a8548",
    'measurementId': "G-KB6BBEKHVF"
}

firebase = pyrebase.initialize_app(firebase)

auth = firebase.auth()


def signIn(request):
    return render(request, "signIn.html")


def postsign(request):
    email = request.POST.get('email')
    password = request.POST.get("pass")
    user = auth.sign_in_with_email_and_password(email, password)
    return render(request, "welcome.html", {"msg": email})


@csrf_exempt
def login(request):
    if request.method == 'POST':
        print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        email = body['email']
        password = body['password']
        print(email)
        print(password)
        try:
            auth.sign_in_with_email_and_password(email, password)
            print("Done")
            return HttpResponse("Ok")
        except:
            print("Invalid data")
            return HttpResponse("Bad data")
    return HttpResponse("Bad data")


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        email = body['email']
        password = body['password']
        repassword = body['repassword']
        print(email)
        print(password)
        print(repassword)
        if password == repassword:
            try:
                auth.create_user_with_email_and_password(email, password)
                print("Done")
                return HttpResponse("Ok")
            except:
                print("Invalid data")
                return HttpResponse("Bad data")
        else:
            print("Password must be same as repassword")
            return HttpResponse("Bad data")
    return HttpResponse("Bad data")


@csrf_exempt
def reset(request):
    if request.method == 'POST':
        print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        email = body['email']
        print(email)
        try:
            auth.send_password_reset_email(email)
            print("Done")
            return HttpResponse("Ok")
        except:
            print("Invalid data")
            return HttpResponse("Bad data")
    return HttpResponse("Bad data")
