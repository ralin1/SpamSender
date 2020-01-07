from django.test import TestCase
from django.test import Client
from time import time
import json.encoder


class FooTests(TestCase):

    def setUp(self) -> None:
        self.client = Client()

    def test_signup(self):
        start = time()
        resp = self.client.post('/signup/', json.dumps({'email': 'testowy@gmail.com', 'password': '123456',
                                                        'repassword': '123456'}),
                                content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        print(time() - start, 'seconds')
        print("----------------------------------------")

    def test_login(self):
        start = time()
        resp = self.client.post('/login/', json.dumps({'email': 'graffy1234@gmail.com', 'password': '123456'}),
                                content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        print(time() - start, 'seconds')
        print("----------------------------------------")

    def test_temp(self):
        start = time()
        resp = self.client.post('/temp/', json.dumps({'name': 'testowy', 'text': 'Jakiś testowy tekst'}),
                                content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        print(time() - start, 'seconds')
        print("----------------------------------------")

    def test_delete_temp(self):
        start = time()
        resp = self.client.post('/delete_template/', json.dumps({'name': 'testowy'}),
                                content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        print(time() - start, 'seconds')
        print("----------------------------------------")

    def test_user(self):
        start = time()
        resp = self.client.post('/find_user/', json.dumps({'tag': 'test'}),
                                content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        print(time() - start, 'seconds')
        print("----------------------------------------")

    def test_send(self):
        start = time()
        resp = self.client.post('/send_message/', json.dumps({'selectedValue': 'testowy', 'tag': 'test'}),
                                content_type="application/json")
        self.assertEqual(resp.status_code, 200)
        print(time() - start, 'seconds')
        print("----------------------------------------")