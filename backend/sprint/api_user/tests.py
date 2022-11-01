from django.test import TestCase, Client

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        self.url = '/user/'

    def test_signup(self):
        client = Client()
        url = self.url+'signup/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)

    def test_signin(self):
        client = Client()
        url = self.url+'signin/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.post(url)
        self.assertEqual(response.status_code, 200)

    def test_signout(self):
        client = Client()
        url = self.url+'signout/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_change(self):
        client = Client()
        url = self.url+'change/'
        # Wrong Method Test
        response = client.get(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.put(url)
        self.assertEqual(response.status_code, 200)

    def test_info(self):
        client = Client()
        url = self.url+'info/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_timetable(self):
        client = Client()
        url = self.url+'timetable/1/'
        # Wrong Method Test
        response = client.delete(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_noti(self):
        client = Client()
        url = self.url+'noti/1/'
        # Wrong Method Test
        response = client.put(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_noti_detail(self):
        client = Client()
        url = self.url+'noti/detail/1/'
        # Wrong Method Test
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_image(self):
        client = Client()
        url = self.url+'image/1/'
        # Wrong Method Test
        # response = client.get(url)
        # self.assertEqual(response.status_code, 405)
        # Right Test
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
