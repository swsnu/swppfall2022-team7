from django.test import TestCase, Client

# Create your tests here.
class TaskTestCase(TestCase):
    def setUp(self):
        self.url = '/task/'

    def test_task(self):
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_task_detail(self):
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)

    def test_belong(self):
        client = Client()
        response = client.get(self.url+'belong/1/')
        self.assertEqual(response.status_code, 200)

    def test_document(self):
        client = Client()
        response = client.get(self.url+'document/1/')
        self.assertEqual(response.status_code, 200)
