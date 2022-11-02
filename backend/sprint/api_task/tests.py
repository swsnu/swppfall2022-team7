from django.test import TestCase, Client

# Create your tests here.
class TaskTestCase(TestCase):
    def setUp(self):
        self.url = '/task/'

    def test_task(self):
        client = Client()
        url = self.url+'1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_m_task(self):
        client = Client()
        url = self.url+'1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)

    def test_task_detail(self):
        client = Client()
        url = self.url+'detail/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_m_task_detail(self):
        client = Client()
        url = self.url+'detail/1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.put(url)
        self.assertEqual(response.status_code, 200)

    def test_belong(self):
        client = Client()
        url = self.url+'belong/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_document(self):
        client = Client()
        url = self.url+'document/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_m_document(self):
        client = Client()
        url = self.url+'document/1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)
