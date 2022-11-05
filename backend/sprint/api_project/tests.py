import json

from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from model_project.models import UserProject, Project
# Create your tests here.
class ProjectTestCase(TestCase):
    def setUp(self):
        self.url = '/project/'
        self.login_url = '/user/signin/'

        self.user1 = get_user_model().objects.create_user(
            username = 'un1',
            password = 'pw1',
            email = 'email1@gmail.com'
        )
        get_user_model().objects.create_user(
            username = 'un2',
            password = 'pw2',
            email = 'email2@gmail.com'
        )

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
        self.assertEqual(response.status_code, 204)

        response = client.get(url)
        self.assertEqual(response.status_code, 200)

        response = client.get(url2)
        self.assertEqual(response.status_code, 401)

    def test_m_project(self):
        client = Client()
        url = self.url+'1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)

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
        }), content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.get(url)
        self.assertEqual(response.status_code, 200)

        response = client.get(url2)
        self.assertEqual(response.status_code, 401)

    def test_m_project_detail(self):
        client = Client()
        url = self.url+'detail/1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.put(url)
        self.assertEqual(response.status_code, 200)

    def test_m_member(self):
        client = Client()
        url = self.url+'member/1/m/1'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.put(url)
        self.assertEqual(response.status_code, 200)
