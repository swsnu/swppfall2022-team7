import os
from pathlib import Path

import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

DOCKER_USERNAME = os.environ["DOCKER_USERNAME"]
DOCKER_PASSWORD = os.environ["DOCKER_PASSWORD"]

os.system("echo {} | docker login -u {} --password-stdin".format(DOCKER_PASSWORD, DOCKER_USERNAME))
os.system("docker build -t shyi0211/frontend {}/frontend".format(BASE_DIR))
os.system("docker push shyi0211/frontend:latest")