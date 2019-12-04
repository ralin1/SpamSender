from django.shortcuts import render
import pyrebase
import json
import json.decoder
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pyrebase

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
db = firebase.database()
auth = firebase.auth()


@csrf_exempt
def temp(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        if body['name'] != '' and body['text'] != '':
            template = db.child("templates").get()
            for key in template.each():
                if body['name'] == key.key():
                    return HttpResponse(status=205)
        else:
            return HttpResponse(status=204)
        try:
            data = {
                "text": body['text']
            }
            db.child("templates").child(body['name']).set(data)
            return HttpResponse(status=200)
        except:
            return HttpResponse(status=206)


@csrf_exempt
def get_temp(request):
    template = db.child("templates").get()
    for value in template.each():
        print(value.val().get('text'))
    return HttpResponse(status=200)


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
            user = auth.sign_in_with_email_and_password(email, password)
            print("Done")
            return HttpResponse(status=200)
        except:
            print("Invalid data")
            return HttpResponse(status=204)
    return HttpResponse(status=204)


@csrf_exempt
def logout(request):
    if request.method == 'POST':
        print(request.body)
        return HttpResponse(status=200)
        # print(request.body)
        # body_unicode = request.body.decode('utf-8')
        # body = json.loads(body_unicode)
        # try:
        #     auth.logout(request)
        #     print("Done")
        #     return HttpResponse(status=200)
        # except:
        #     print("Internal error")
        #     return HttpResponse(status=204)
    return HttpResponse(status=204)


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
                return HttpResponse(status=200)
            except:
                print("Invalid data")
            return HttpResponse(status=204)
        else:
            print("Password must be same as repassword")

            return HttpResponse(status=204)


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
            return HttpResponse(status=200)
        except:
            print("Invalid data")
            return HttpResponse(status=204)
