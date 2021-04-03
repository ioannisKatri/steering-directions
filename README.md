## Description

Calculate steering directions through a REST API  


## Getting Started

The API is packaged with a Docker compose file. In order to run it use the following command:
``` 
docker-compose up -d --build
```



##### API can be accessed from:
- non-dockerised setup [here](http://localhost:3000).
- dockerised setup [here](http://127.0.0.1:3000).

#### About

Direction API accepts two query parameters 
 - `heading`: The absolute magnetic heading relative to the north pole.
 - `target`: The absolute bearing to the target.

#### Example of a valid request

```
/directions?heading=310&target=75
```

#### Example of a response

```
{"success":true,"payload":{"direction":"Right"}}
```

#### Documentation
You can find the Api Swagger file:

- non-dockerised setup [here](http://localhost:3000/api-docs).
- dockerised setup [here](http://127.0.0.1:3000/api-docs).

#### Setup
```
npm install
```

#### Run without docker
```
npm run dev
```

#### Architecture
 
![Upload Api](https://i.ibb.co/d5Gs93M/image.png)
Link [here](https://swimlanes.io/u/tWroygbKG?rev=2).
