import json
from datetime import datetime
from django.test import TestCase, Client
from rest_framework.authtoken.models import Token
from model_project.models import Task, Project, UserProject, DocumentSpace
from model_user.models import get_user_model

# Create your tests here.
class DocumentSpaceTestCase(TestCase):
    def setUp(self):
        self.url = '/document/'
        # Dummy
        self.test_user = get_user_model().objects.create_user(
            username='test',
            password='test',
            email='email@gmail.com'
        )
        self.test_project = Project.objects.create(
            name='test',
            subject='name',
            manager=self.test_user
        )
        self.test_space = DocumentSpace.objects.create(
            name = 'test',
            project = self.test_project,
            head = -1,
        )
        self.test_token = Token.objects.create(user = self.test_user).key

    def create_test_dummy(self):
        UserProject.objects.create(
            user = self.test_user,
            project = self.test_project
        )

    def test_docuspace(self):
        client = Client()
        url = self.url+str(self.test_project.id)+'/'
        # Wrong Method Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)

    def test_m_docuspace(self):
        client = Client()
        url = self.url+str(self.test_project.id)+'/m/'
        # Wrong Method Test
        response = client.post(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.post(
            url,
            data = json.dumps({
                'name': 'test'
            }),
            content_type='application/json',
            **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 201)

    def test_docuspace_detail(self):
        client = Client()
        url = self.url+'detail/'+str(self.test_space.id)+'/'
        # Wrong Method Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)

    def test_m_docuspace_detail(self):
        client = Client()
        url = self.url+'detail/'+str(self.test_space.id)+'/m/'
        # Wrong Method Test
        response = client.put(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.put(
            url,
            data = json.dumps({
                'name': 'test',
                'head': -1
            }),
            content_type='application/json',
            **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)
        response = client.delete(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 204)
