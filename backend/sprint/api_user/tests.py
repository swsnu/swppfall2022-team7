from django.test import TestCase, Client

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        '''user test set up'''
        self.url = '/user/'

    def test_signup(self):
        '''test api_user.signup'''
        client = Client()
        response = client.get(self.url+'signup/')
        self.assertEqual(response.status_code, 200)

    def test_signin(self):
        '''test api_user.signin'''
        client = Client()
        response = client.get(self.url+'signin/')
        self.assertEqual(response.status_code, 200)

    def test_signout(self):
        '''test api_user.signout'''
        client = Client()
        response = client.get(self.url+'signout/')
        self.assertEqual(response.status_code, 200)

    def test_change(self):
        '''test api_user.change'''
        client = Client()
        response = client.get(self.url+'change/')
        self.assertEqual(response.status_code, 200)

    def test_info(self):
        '''test api_user.info'''
        client = Client()
        response = client.get(self.url+'info/1/')
        self.assertEqual(response.status_code, 200)

    def test_timetable(self):
        '''test api_user.timetable'''
        client = Client()
        response = client.get(self.url+'timetable/1/')
        self.assertEqual(response.status_code, 200)

    def test_noti(self):
        '''test api_user.noti'''
        client = Client()
        response = client.get(self.url+'noti/1/')
        self.assertEqual(response.status_code, 200)

    def test_noti_detail(self):
        '''test api_user.noti_detail'''
        client = Client()
        response = client.get(self.url+'noti/detail/1/')
        self.assertEqual(response.status_code, 200)

    def test_image(self):
        '''test api_user.image'''
        client = Client()
        response = client.get(self.url+'image/1/')
        self.assertEqual(response.status_code, 200)
