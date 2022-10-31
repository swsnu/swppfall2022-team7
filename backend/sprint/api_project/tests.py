from django.test import TestCase, Client

# Create your tests here.
class ProjectTestCase(TestCase):
    def setUp(self):
        self.url = '/project/'

    def test_project(self):
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_project_detail(self):
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)

    def test_member(self):
        client = Client()
        response = client.get(self.url+'member/1/')
        self.assertEqual(response.status_code, 200)
