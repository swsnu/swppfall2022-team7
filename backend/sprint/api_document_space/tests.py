from django.test import TestCase, Client

# Create your tests here.
class DocumentSpaceTestCase(TestCase):
    def setUp(self):
        self.url = '/document/'

    def test_docuspace(self):
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_docuspace_detail(self):
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)
