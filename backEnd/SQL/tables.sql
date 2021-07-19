drop table if exists notetags;
drop table if exists notes;
drop table if exists users;
drop table if exists tags;


create table users(
    id serial primary key,
    username text not null unique,
    name text,
    password text not null
);

create table notes(
    id serial primary key,
    title text,
    note text,
    addedOn timestamp,
    stared boolean,
    usr serial references users(id) 
);

create table tags(
    id serial primary key,
    tag text
);

create table notetags(
    id serial primary key,
    note serial references notes(id),
    tag serial references tags(id) 
);