from django.test import TestCase, Client

# Create your tests here.
class TaskTestCase(TestCase):
    def setUp(self):
        '''task test set up'''
        self.url = '/task/'

    def test_task(self):
        '''test api_task.task'''
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_task_detail(self):
        '''test api_task.task_detail'''
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)

    def test_belong(self):
        '''test api_task.belong'''
        client = Client()
        response = client.get(self.url+'belong/1/')
        self.assertEqual(response.status_code, 200)

    def test_document(self):
        '''test api_task_document'''
        client = Client()
        response = client.get(self.url+'document/1/')
        self.assertEqual(response.status_code, 200)
