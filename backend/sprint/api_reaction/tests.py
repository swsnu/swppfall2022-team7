from django.test import TestCase, Client

# Create your tests here.
class ReactionTestCase(TestCase):
    def setUp(self):
        self.url = '/reaction/'

    def test_reaction(self):
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_reaction_detail(self):
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)
