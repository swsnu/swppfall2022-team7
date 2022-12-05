import json

from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from model_project.models import UserProject, Project

# Create your tests here.
class ProjectTestCase(TestCase):
    def login(self, client) :
        client.post(self.login_url, data = json.dumps({
            "email": "email1@gmail.com",
            "password": "pw1"
        }), content_type='application/json')
        return client
    def setUp(self):
        self.url = '/project/'
        self.login_url = '/user/signin/'

        self.user1 = get_user_model().objects.create_user(
            username = 'un1',
            password = 'pw1',
            email = 'email1@gmail.com'
        )
        self.user2 = get_user_model().objects.create_user(
            username = 'un2',
            password = 'pw2',
            email = 'email2@gmail.com'
        )

        self.token1 = Token.objects.create(user = self.user1).key
        self.token2 = Token.objects.create(user = self.user2).key

        self.project1 = Project.objects.create(
            name="pn",
            subject="sj",
            manager=self.user1
        )

        UserProject.objects.create(
            user=self.user1,
            project=self.project1
        )

    def test_project(self):
        client = Client()
        url = self.url+str(self.user1.pk)+'/'
        url2 = self.url+'0/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 401)

        response = client.post(self.login_url, data = json.dumps({
            "email": "email1@gmail.com",
            "password": "pw1"
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 200)

        response = client.get(url2, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 401)

    def test_m_project(self):
        client = Client()
        url = self.url+'m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 401)

        client = self.login(client)
        response = client.post(url, data = {
            "name": "name",
            "subject": "subject",
            "member_list": [
                "email2@gmail.com"
            ]
        }, content_type='application/json', **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 201)

    def test_project_detail(self):
        client = Client()
        url = self.url+'detail/'+str(self.project1.pk)+'/'
        url2 = self.url+'detail/0/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 401)

        response = client.post(self.login_url, data = json.dumps({
            "email": "email1@gmail.com",
            "password": "pw1"
        }), content_type='application/json', **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 200)

        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 200)

        response = client.get(url2, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 401)

    def test_m_project_detail(self):
        client = Client()
        url = self.url+f'detail/{self.project1.pk}/m/'
        url2 = self.url+'detail/0/m/'

        proj = Project.objects.create(
            name="pn2",
            subject="sj2",
            manager=self.user1
        )
        url3 = self.url+f'detail/{proj.pk}/m/'
        # Wrong Method Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.put(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 400)

        response = client.post(self.login_url, data = json.dumps({
            "email": "email1@gmail.com",
            "password": "pw1"
        }), content_type='application/json', **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 200)

        response = client.put(url, data = json.dumps({
        }), content_type='application/json', **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 201)

        response = client.put(url, data = json.dumps({
            "name": "name",
            "subject": "subject",
            "manager": self.user2.pk
        }), content_type='application/json', **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 201)

        response = client.put(url2, data = json.dumps({
        }), content_type='application/json', **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 401)

        response = client.delete(url3)

    def test_m_member(self):
        client = Client()
        url = self.url+f'detail/{self.project1.pk}/member/{self.user2.pk}/'
        url2 = self.url+f'detail/0/member/{self.user2.pk}/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.put(url)
        self.assertEqual(response.status_code, 401)

        client = self.login(client)
        response = client.put(url2, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 401)

        response = client.put(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 201)

        response = client.delete(url, **{'HTTP_AUTHORIZATION': "Token " + self.token1})
        self.assertEqual(response.status_code, 204)
