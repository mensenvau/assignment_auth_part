create database authtest;

use authtest ;

create  table  users
(
    id int auto_increment primary key  ,
    name char(100),
    usr char(100) not null unique key,
    psw char(250) not null,
    savetime datetime default  current_timestamp
);

insert into users(name , usr, psw ) Value ('admin','admin',md5('@12345'));

create  table  auth_user
(
    id int auto_increment primary key  ,
    users_id int not null  ,
    token char(200) not null,
    savetime datetime default  current_timestamp ,
    FOREIGN KEY (users_id) REFERENCES users(id)
);
