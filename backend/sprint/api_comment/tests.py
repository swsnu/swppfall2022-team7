from django.test import TestCase, Client

# Create your tests here.
class CommentTestCase(TestCase):
    def setUp(self):
        self.url = '/comment/'

    def test_comment(self):
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_comment_detail(self):
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)
