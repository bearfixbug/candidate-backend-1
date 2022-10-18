# Require*
  - MySQL (Database Language)
  - Node Package Management (NodeJS)

# How to test
  - Download or clone my repo on your desktop
  - Open terminal in project
  - Use command "npm install" for install package
  - Use command "npm run dev" for run this project
  - Create file .env and replace this 
  ```
  KEY=9f60f29a3b4d4cd5940e14202b8a79f7
  IV=7d8bf3f84f0d11ed
  ```

# Script to Create Database and Table
> Recommend Database name : candidate
  ```ruby
create table tb_booking
(
    id         int auto_increment
        primary key,
    bookno     text   null,
    cusid      text   null,
    servicesid int    null,
    createdAt  text   null,
    mil        bigint null,
    constraint tb_booking_id_uindex
        unique (id)
);
```
  ```ruby
create table tb_services
(
    id           int auto_increment
        primary key,
    _id          text   null,
    name         text   null,
    price        float  null,
    picture      text   null,
    description  text   null,
    doingtime    text   null,
    doingtimemil bigint null,
    constraint tb_services_id_uindex
        unique (id)
);
```
```ruby
create table tb_user
(
    id           int auto_increment
        primary key,
    cusid        text   null,
    fullname     text   null,
    username     text   null,
    password     text   null,
    doingtime    text   null,
    doingtimemil bigint null,
    constraint tb_user_id_uindex
        unique (id)
);
```

# API Specification Document
  > For check token and decrypt token
  - POST : http://localhost:3003/des 
  - Body request
  ```ruby
  {
    "token": "ejTTzCy8oajuW7veDyTxNZZVfgIMQ+5YA6svEceFeBtOSZOb7AEEZoT8oOo6Rk30dsZB6wIde/Z0EP24vwI8I8ffOm6Yq9yzVd4lrpKSLuKOred0xdc/2dACgsyVxZpg8BiUkvTfIXLYnq1t3KAxFOmpUC2VdD1qT/Uiw2uABkk="
  }
  ```
  
  <br/><br/>
  
  > Register
  - POST : http://localhost:3003/v1/auth/register
  - Body request
  ```ruby
  {
    "fullName": "Tyrion Lannister",
    "username": "TL",
    "password": "1234"
  }
  ```

  <br/><br/>
  
  > Signin
  - POST : http://localhost:3003/v1/auth/signin
  - Body request
  ```ruby
  {
    "username": "TL",
    "password": "1234"
  }
  ```
  
  <br/><br/>
  
  > All Services
  - GET : http://localhost:3003/v1/services
    <br/><br/>
  > Services by ID
  - GET : http://localhost:3003/v1/services/{SID}
  ```ruby
    Ex. http://localhost:3003/v1/services/89c6f3b4-4f0f-11ed-bdc3-0242ac120002
  ```
  
  <br/><br/>
  
  > Booking
  - POST : http://localhost:3003/v1/{SERVICE_ID}/booking
  ```ruby
    Ex. http://localhost:3003/v1/3/booking
  ```
  - Body request
  ```ruby
  {
    "token": "ejTTzCy8oajuW7veDyTxNZZVfgIMQ+5YA6svEceFeBtOSZOb7AEEZoT8oOo6Rk30XiwcV8gjKfTIye2FRO+uoxlQbWcoLchc8bayHZlrdI660LguC82rh+Q7YnJT6qTZ+EtQyba71qqEDMc8SE56CXGPnQiESaBA/auiXgxLKDg="
  }
  ```
  
  <br/><br/>
  
  > Orders
  - POST : http://localhost:3003/v1/orders
  - Body request
  ```ruby
  {
    "token": "ejTTzCy8oajuW7veDyTxNZZVfgIMQ+5YA6svEceFeBtOSZOb7AEEZoT8oOo6Rk30XiwcV8gjKfTIye2FRO+uoxlQbWcoLchc8bayHZlrdI660LguC82rh+Q7YnJT6qTZ+EtQyba71qqEDMc8SE56CXGPnQiESaBA/auiXgxLKDg="
  }
  ```
  



# Conclution
  - This project will run on port 3003. you can use http://localhost:3003
  
