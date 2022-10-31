from django.test import TestCase, Client

# Create your tests here.
class MeetingTestCase(TestCase):
    def setUp(self):
        self.url = '/meeting/'

    def test_meeting(self):
        client = Client()
        response = client.get(self.url+'1/')
        self.assertEqual(response.status_code, 200)

    def test_meeting_detail(self):
        client = Client()
        response = client.get(self.url+'detail/1/')
        self.assertEqual(response.status_code, 200)
