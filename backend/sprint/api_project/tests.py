from django.test import TestCase, Client

# Create your tests here.
class ProjectTestCase(TestCase):
    def setUp(self):
        '''project test set up'''
        self.url = '/project/'

    def test_project(self):
        '''test api_project.project'''
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_project_detail(self):
        '''test api_project.project_detail'''
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)

    def test_member(self):
        '''test api_project.member'''
        client = Client()
        response = client.get(self.url+'member/1/')
        self.assertEqual(response.status_code, 200)
