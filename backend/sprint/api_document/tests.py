from django.test import TestCase, Client

# Create your tests here.
class DocumentTestCase(TestCase):
    def setUp(self):
        self.url = '/documents/'

    def test_document(self):
        client = Client()
        url = self.url+'1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_m_document(self):
        client = Client()
        url = self.url+'1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)

    def test_document_detail(self):
        client = Client()
        url = self.url+'detail/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_m_document_detail(self):
        client = Client()
        url = self.url+'detail/1/m/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.put(url)
        self.assertEqual(response.status_code, 200)
