# 실행 방법
- client 폴더에서 `npm install` 후 `npm start`로 앱서버 실행
- server 폴더에서 패키지충돌이 일어나지 않기위해 안전한 가상환경에 들어가기 위해 `python3 -m venv venv` 실행하여 설치
  - 후에 가상환경에 접속하기위해 `source venv/bin/activate` 실행
- server 폴더에서 패키지환경을 맞추기위해 `pip install -r requirements.txt` 실행
- server 폴더에서 `python manage.py runserver` 로 서버 실행
