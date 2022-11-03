import os

os.system('travis encrypt-file -f --com ../backend/.env')
os.system('mv .env.enc ../backend/env.enc')
