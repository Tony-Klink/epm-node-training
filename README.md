# EPAM NODE.JS TRAINING MODULES
- HOMEWORK 4 "APPLICATION. VALIDATION. SECURITY"

#Build and run  Express App

- npm run build

#Test app features

- Generate JWT
````
curl --request POST \
  --url http://localhost:8080/auth \
  --header 'content-type: application/json' \
  --cookie connect.sid=s%253AE00rSyXXv5JQPKLAZw5uM879ySFKbizx.%252B2bY%252F3b7IUalA5QN%252F%252BR3pl%252Bb67eKD2LlinGiiRFOeEg \
  --data '{"login": "Jane", "password":"zaq123"}'

````
- Test JWT
````
  curl --request GET \
  --url http://localhost:8080/users/ \
  --header 'content-type: application/json' \
  --cookie connect.sid=s%253AE00rSyXXv5JQPKLAZw5uM879ySFKbizx.%252B2bY%252F3b7IUalA5QN%252F%252BR3pl%252Bb67eKD2LlinGiiRFOeEg \
  --data '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblN1Y2Nlc3MiOnRydWUsImlhdCI6MTUyOTMxNTUxNX0.Q3JoqOzmhp7PSKI_uYepotiY28usg99WyEK8F6IHqGo"}'
````
- Test Local Auth Strategy
````
  curl --request POST \
  --url http://localhost:8080/login/local \
  --header 'content-type: application/x-www-form-urlencoded' \
  --cookie connect.sid=s%253AE00rSyXXv5JQPKLAZw5uM879ySFKbizx.%252B2bY%252F3b7IUalA5QN%252F%252BR3pl%252Bb67eKD2LlinGiiRFOeEg \
  --data 'username=Jane&password=zaq123'
  ````
  Other strategies requires API Keys