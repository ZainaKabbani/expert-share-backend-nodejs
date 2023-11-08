# expert-share-backend-nodejs

## System to connect between the experts from different domains and the users.

### Technologies:
the project is created with: 
* Node.js
* Express.js
* Mongoose

### Testing: 
After downloading the project, you can import the postman collection which is in the a directory named postman to your postman app and test the different requests.<br>
to login:<br> 
for the users: 
| Email             |  Password  |
|:------------------|--------:|
| user1@gmail.com   | 12345 |
| user2@gmail.com   |  12345 |
| user3@gmail.com   | 12345 | 

for the experts: 
| Email |  Password  |
|:-----|--------:|
| expert1@gmail.com   | 12345 |
| expert2@gmail.com   |  12345 |
| expert3@gmail.com   | 12345 | 

### Things you need to install to run the project:
* install NodeJS

### Setup:
To run this project, install it locally then follow this: 
~~~
$ cd ./expers-share-backend-nodejs
$ npm i --legacy-peer-deps
$ npm start
~~~

### Services:
* The ability to signup as user or expert and login.
* List all the experts and show the details for a specific expert with the ability to add him to favorite and rate.
* Book an appointment with an expert and list the booked appointments.
* List the booked appointments for the expert who is logged in.
