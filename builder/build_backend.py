import os
from pathlib import Path

import os
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# for environ setting
env = environ.Env(DEBUG=(bool, True))
environ.Env.read_env(
    env_file=os.path.join(BASE_DIR, 'backend', '.env')
)

DOCKER_USERNAME = env("DOCKER_USERNAME")
DOCKER_PASSWORD = env("DOCKER_PASSWORD")

os.system("echo {} | docker login -u {} --password-stdin".format(DOCKER_PASSWORD, DOCKER_USERNAME))
os.system("docker build -t shyi0211/backend {}/backend".format(BASE_DIR))
os.system("docker push shyi0211/backend:latest")