# --- !Ups

CREATE TABLE "user" (
    id uuid primary key default uuid_generate_v4(),
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar_url VARCHAR,
    "desc" VARCHAR
);

CREATE TABLE "gallery" (
    id uuid primary key default uuid_generate_v4(),
    name VARCHAR,
    "desc" VARCHAR,
    img_small_url VARCHAR,
    img_large_url VARCHAR
);

CREATE TABLE "email_news" (
    id uuid primary key default uuid_generate_v4(),
    email VARCHAR,
    "data" timestamp with time zone
);

CREATE TABLE "contact" (
    id uuid primary key default uuid_generate_v4(),
    name VARCHAR,
    email VARCHAR,
    web_site VARCHAR,
    text_email VARCHAR,
    "data" timestamp with time zone,
    "sent" boolean
);

CREATE TABLE "category" (
    id uuid primary key default uuid_generate_v4(),
    name VARCHAR,
    "url" VARCHAR,
    "desc" VARCHAR
);

CREATE TABLE "product" (
    id uuid primary key default uuid_generate_v4(),
    category_id uuid,
    name VARCHAR,
    "desc" VARCHAR,
    img_small_url VARCHAR,
    img_large_url VARCHAR,
    comments timestamp with time zone,
    feature boolean,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

# --- !Downs

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS email_news;
DROP TABLE IF EXISTS contact;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;