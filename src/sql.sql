DROP database EduConnect;
CREATE database EduConnect;
Use EduConnect;

CREATE TABLE User(
username varchar(20) PRIMARY KEY,
email varchar(255),
password varchar(20),
date_Of_Birth date,
level int DEFAULT 0,
time_Spent Decimal(10,2) DEFAULT 0,
avatar varchar(255) DEFAULT './assets/avatar.jpg',
point int
);

CREATE TABLE Course(
course_Id varchar(20) PRIMARY KEY,
coursename varchar(255),
category varchar(20),
duration Decimal(10,2),
level int,
description text,
course_image_Lg varchar(255),
course_image_Sm varchar(255)
);

CREATE TABLE Course_Enroll(
username varchar(20),
course_Id varchar(20),
status VARCHAR(20) CHECK (status = 'completed' OR status = 'onprogress'),
progress int,
PRIMARY KEY (username,course_Id),
FOREIGN KEY(username) REFERENCES User(username) on delete cascade,
FOREIGN KEY(course_Id) REFERENCES Course(course_Id) on delete cascade
);

CREATE TABLE Module(
module_Id varchar(20) PRIMARY KEY,
topic varchar(255),
module_Type varchar(20),
weighted Decimal(10,2) check (weighted >= 0 AND weighted <= 10),
content text
); 

CREATE TABLE Course_module(
course_Id varchar(20),
module_Id varchar(20),
week varchar(10),
marks Decimal(10,2),
FOREIGN KEY(module_Id) REFERENCES Module(module_Id) on delete cascade,
FOREIGN KEY(course_Id) REFERENCES Course(course_Id) on delete cascade
);

CREATE TABLE Review(
username varchar(20),
course_Id varchar(20),
value double,
message varchar(20),
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(username) REFERENCES User(username) on delete cascade,
FOREIGN KEY(course_Id) REFERENCES Course(course_Id) on delete cascade
);

CREATE TABLE Notification(
notification_Id varchar(20) PRIMARY KEY,
status varchar(20),
date date,
text text
);

CREATE TABLE User_notification(
username varchar(20),
notification_Id varchar(20),
FOREIGN KEY(username) REFERENCES User(username) on delete cascade,
FOREIGN KEY(notification_Id) REFERENCES Notification(notification_Id) on delete cascade
);

CREATE TABLE Post(
post_Id varchar(20) PRIMARY KEY,
username varchar(20),
date date,
image varchar(255),
text text,
FOREIGN KEY(username) REFERENCES User(username) on delete cascade
);

CREATE TABLE Reply(
post_Id varchar(20),
date date,
username varchar(20),
FOREIGN KEY(username) REFERENCES User(username) on delete cascade,
FOREIGN KEY(post_Id) REFERENCES Post(post_Id) on delete cascade
);