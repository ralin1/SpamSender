from django.shortcuts import render
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

auth = firebase.auth()

def signIn(request):

    return render(request, "signIn.html")

def postsign(request):

    email = request.POST.get('email')
    password = request.POST.get("pass")
    user = auth.sign_in_with_email_and_password(email, password)
    return render(request, "welcome.html", {"msg": email})