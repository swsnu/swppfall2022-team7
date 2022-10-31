from django.test import TestCase, Client

# Create your tests here.
class DocumentTestCase(TestCase):
    def setUp(self):
        self.url = '/documents/'

    def test_document(self):
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_document_detail(self):
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)
