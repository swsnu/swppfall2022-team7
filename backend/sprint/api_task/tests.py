import json
from datetime import datetime
from django.test import TestCase, Client
from rest_framework.authtoken.models import Token
from model_project.models import Task, Project, UserProject, DocumentSpace, TaskDocumentSpace
from model_user.models import get_user_model

# Create your tests here.
class TaskTestCase(TestCase):
    def setUp(self):
        self.url = '/task/'
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
        self.test_task = Task.objects.create(
            name = 'test',
            project = self.test_project,
            content = 'test',
            assignee = self.test_user,
            until_at = datetime(2022, 2, 11)
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

    def test_get_task(self):
        client = Client()
        url = self.url+str(self.test_project.id)+'/'
        # Right Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)
        response = client.get(self.url+'0/', **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 404)

    def test_m_task(self):
        client = Client()
        url = self.url+str(self.test_project.id)+'/m/'
        # Wrong Method Test
        response = client.post(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.post(
            url,
            data = json.dumps({
                'assignee': self.test_user.id,
                'name': 'test',
                'content': 'test',
                'untilAt': '2022-02-02'
            }),
            content_type = 'application/json',
            **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 201)

    def test_task_detail(self):
        client = Client()
        url = self.url+'detail/'+str(self.test_task.id)+'/'
        # Wrong Method Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)

    def test_m_task_detail(self):
        client = Client()
        url = self.url+'detail/'+str(self.test_task.id)+'/m/'
        # Wrong Method Test
        response = client.put(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.put(
            url,
            data = json.dumps({
                'assignee': self.test_user.id,
                'name': 'test',
                'content': 'test',
                'untilAt': '2022-02-12'
            }),
            content_type='application/json',
            **{'HTTP_AUTHORIZATION': "Token " + self.test_token}
        )
        self.assertEqual(response.status_code, 200)
        response = client.delete(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 204)

    def test_belong(self):
        client = Client()
        url = self.url+'belong/'+str(self.test_user.id)+'/'
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)

    def test_document(self):
        client = Client()
        url = self.url+'document/'+str(self.test_task.id)+'/'
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        TaskDocumentSpace.objects.create(
            task = self.test_task,
            document_space = self.test_space
        )
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)

    def test_m_document(self):
        client = Client()
        url = self.url+'document/'+str(self.test_task.id)+'/m/'
        # Wrong Method Test
        response = client.post(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.post(
            url,
            data = json.dumps({
                'documentId': self.test_space.id
            }),
            content_type = 'application/json',
            **{'HTTP_AUTHORIZATION': "Token " + self.test_token}
        )
        self.assertEqual(response.status_code, 201)
        response = client.delete(
            url,
            data = json.dumps({
                'documentId': self.test_space.id
            }),
            content_type = 'application/json',
            **{'HTTP_AUTHORIZATION': "Token " + self.test_token}
        )
        self.assertEqual(response.status_code, 204)
