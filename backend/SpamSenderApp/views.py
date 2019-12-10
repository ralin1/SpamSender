import json
import json.decoder
import json.encoder
import pyrebase
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .tweepy_connection import search_users_data, direct_message, search_users_data

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
def send_message(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        try:
            for x in search_users_data("#" + body["tag"]):
                print(x)
                print(body["selectedValue"].replace("{name}", str(x[2]))
                      .replace("{username}", str(x[1])).replace("{city}", str(x[3])))
            return HttpResponse(status=200)
        except:
            HttpResponse(status=204)
    return HttpResponse(status=205)


@csrf_exempt
def find_user(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        usernames = []
        screen_names = []
        print(body)
        if body['tag'] != '':
            try:
                for user_id, user_data in search_users_data("#" + body['tag']).items():
                    # for user_id, screen_name, name, location in search_users_data("#" + body['tag']).items():
                    # print(username, screen_name)
                    usernames.append(user_id)
                    screen_names.append(user_data)
                print(len(usernames))
                return JsonResponse({"username": usernames, "screen_name": screen_names})
            except:
                return HttpResponse(status=204)
        return HttpResponse(status=205)


@csrf_exempt
def temp(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        try:
            if body['name'] != '' and body['text'] != '':
                data = {
                    "text": body['text']
                }
                db.child("templates").child(body['name']).set(data)
                return HttpResponse(status=200)
        except:
            return HttpResponse(status=206)


@csrf_exempt
def get_template(request):
    if request.method == 'POST':
        template = db.child("templates").get()
        names = []
        texts = []
        for key in template.each():
            names.append(key.key())
            texts.append(key.val())
        return JsonResponse({"name": names, "text": texts})


@csrf_exempt
def delete_template(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        try:
            if body['name'] != '':
                template = db.child("templates").get()
                for key in template.each():
                    if body['name'] == key.key():
                        db.child("templates").child(body['name']).remove()
                        return HttpResponse(status=200)
                return HttpResponse(status=205)
            else:
                return HttpResponse(status=204)
        except:
            return HttpResponse(status=206)


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
