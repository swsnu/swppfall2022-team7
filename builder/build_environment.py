import os

os.system('tar -cvf ../backend/env.tar ../backend/.env')
os.system('travis encrypt-file -f --com ../backend/env.tar')
os.system('mv env.tar.enc ../backend/env.tar.enc')
