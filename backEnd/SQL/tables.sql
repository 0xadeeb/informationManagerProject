drop table if exists noteTags;
drop table if exists users;
drop table if exists notes;
drop table if exists tags;


create table users(
    id serial primary key,
    username text not null unique,
    name text,
    password text not null
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
    id serial primary key,
    usr serial references users(id),
    tag serial references tags(id) 
);