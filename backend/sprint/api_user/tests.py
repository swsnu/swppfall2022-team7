from django.test import TestCase, Client

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        self.url = '/user/'
    
    def test_signup(self):
        client = Client()
        response = client.get(self.url+'signup/')
        self.assertEqual(response.status_code, 200)
    
    def test_signin(self):
        client = Client()
        response = client.get(self.url+'signin/')
        self.assertEqual(response.status_code, 200)
    
    def test_signout(self):
        client = Client()
        response = client.get(self.url+'signout/')
        self.assertEqual(response.status_code, 200)
    
    def test_change(self):
        client = Client()
        response = client.get(self.url+'change/')
        self.assertEqual(response.status_code, 200)
    
    def test_info(self):
        client = Client()
        response = client.get(self.url+'info/1/')
        self.assertEqual(response.status_code, 200)
    
    def test_timetable(self):
        client = Client()
        response = client.get(self.url+'timetable/1/')
        self.assertEqual(response.status_code, 200)
    
    def test_noti(self):
        client = Client()
        response = client.get(self.url+'noti/1/')
        self.assertEqual(response.status_code, 200)
    
    def test_noti_detail(self):
        client = Client()
        response = client.get(self.url+'noti/detail/1/')
        self.assertEqual(response.status_code, 200)
    
    def test_image(self):
        client = Client()
        response = client.get(self.url+'image/1/')
        self.assertEqual(response.status_code, 200)
