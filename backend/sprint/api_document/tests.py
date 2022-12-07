import json
from django.test import TestCase, Client
from rest_framework.authtoken.models import Token
from model_project.models import Project, DocumentSpace, Document, UserProject
from model_user.models import get_user_model

# Create your tests here.
class DocumentTestCase(TestCase):
    def setUp(self):
        self.url = '/documents/'
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
        self.test_doc1 = Document.objects.create(
            space = self.test_space
        )
        self.test_doc2 = Document.objects.create(
            space = self.test_space
        )
        self.test_space.head = self.test_doc1.id
        self.test_space.save()
        self.test_token = Token.objects.create(user = self.test_user).key

    def create_test_dummy(self):
        UserProject.objects.create(
            user = self.test_user,
            project = self.test_project
        )

    def test_document(self):
        client = Client()
        url = self.url+str(self.test_space.id)+'/'
        # Wrong Method Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)

    def test_m_document(self):
        client = Client()
        url = self.url+str(self.test_space.id)+'/m/'
        # Wrong Method Test
        response = client.post(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.post(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 201)

    def test_document_detail(self):
        client = Client()
        url = self.url+'detail/'+str(self.test_doc1.id)+'/'
        # Wrong Method Test
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.get(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 200)

    def test_m_document_detail(self):
        client = Client()
        url = self.url+'detail/'+str(self.test_doc1.id)+'/m/'
        # Wrong Method Test
        response = client.delete(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 403)
        self.create_test_dummy()
        response = client.delete(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 204)
        url = self.url+'detail/'+str(self.test_doc2.id)+'/m/'
        response = client.delete(url, **{'HTTP_AUTHORIZATION': "Token " + self.test_token})
        self.assertEqual(response.status_code, 204)
