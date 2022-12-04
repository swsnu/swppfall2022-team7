import json

from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        self.url = '/user/'
        user1 = get_user_model().objects.create_user(
            username = 'un1',
            password = 'pw1',
            email = 'email1@gmail.com'
        )
        get_user_model().objects.create_user(
            username = 'un2',
            password = 'pw2',
            email = 'email2@gmail.com'
        )
        self.token1 = Token.objects.create(user = user1).key

    def test_signup(self):
        client = Client()
        url = self.url+'signup/'
        # Wrong Method Test
        client.get(self.url+'token/')
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 400)

        response = client.post(url, data = json.dumps({
            "username": "seokwoo",
            "email": "poding84@snu.ac.kr",
            "password": "1"
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Duplicate user
        response = client.post(url, data = json.dumps({
            "username": "seokwoo",
            "email": "poding84@snu.ac.kr",
            "password": "1"
        }), content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_signin(self):
        client = Client()
        url = self.url+'signin/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 400)

        response = client.post(url, data = json.dumps({
            "email": "email1@gmail.com",
            "password": "pw1"
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Wrong password
        response = client.post(url, data = json.dumps({
            "email": "email1@gmail.com",
            "password": "pw2"
        }), content_type='application/json')
        self.assertEqual(response.status_code, 401)


    def test_signout(self):
        client = Client()
        url = self.url+'signout/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 401)

        response = client.post(self.url+'signin/', data = json.dumps({
            "email": "email1@gmail.com",
            "password": "pw1"
        }), content_type='application/json')

        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 204)

    def test_change(self):
        client = Client()
        url = self.url+'change/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test

    def test_info(self):
        client = Client()
        url = self.url+'info/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 200)

    def test_timetable(self):
        client = Client()
        url = self.url+'timetable/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_m_timetable(self):
        client = Client()
        url = self.url+'timetable/1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)

    def test_noti(self):
        client = Client()
        url = self.url+'noti/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 200)


    def test_image(self):
        client = Client()
        url = self.url+'image/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_m_image(self):
        client = Client()
        url = self.url+'image/1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)
