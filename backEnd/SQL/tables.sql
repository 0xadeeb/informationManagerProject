drop table if exists noteTags;
drop table if exists users;
drop table if exists notes;
drop table if exists tags;


create table users(
    id serial primary key,
    Username text not null unique,
    passwrd text
);

create table notes(
    id serial primary key,
    note text,
    addedOn timestamp,
    stared boolean
);

create table tags(
    id serial primary key,
    tag text
);

create table noteTags(
    usr serial references users(id),
    tag serial references tags(id) 
);