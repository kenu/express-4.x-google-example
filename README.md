This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users using GitHub, Google, Kakao, Naver.
Use this example as a starting point for your own web applications.
This project is forked and modified from
[Facebook example](https://github.com/passport/express-4.x-facebook-example).

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
git clone https://github.com/kenu/express-4.x-google-example.git
cd express-4.x-google-example
git checkout -b multi origin/multi
npm i
```

The example uses environment variables to configure the consumer key and
consumer secret needed to access
* [GitHub's OAuth API](https://github.com/settings/developers).
  - callback url: http://localhost:3000/login/github/return
* [Google's OAuth API](https://console.developers.google.com/apis/credentials).
  - callback url: http://localhost:3000/login/google/return
* [Kakao's OAuth API](https://developers.kakao.com/console/app).
  - callback url: http://localhost:3000/login/kakao/return
* [Naver's OAuth API](https://developers.naver.com/apps/#/list).
  - callback url: http://localhost:3000/login/naver/return
Start the server with those variables set to the appropriate credentials.

- `.env`

```
GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}

GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

KAKAO_CLIENT_ID=${KAKAO_CLIENT_ID}
KAKAO_CLIENT_SECRET=${KAKAO_CLIENT_SECRET}

NAVER_CLIENT_ID=${NAVER_CLIENT_ID}
NAVER_CLIENT_SECRET=${NAVER_CLIENT_SECRET}
```

```
node server.js
```

Open a web browser and navigate to [http://localhost:3000/](http://localhost:3000/)
to see the example in action.
