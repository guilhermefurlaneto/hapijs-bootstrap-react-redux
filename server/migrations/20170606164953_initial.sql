---!> MARINER:MIGRATE:UP:
BEGIN;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        display_name text not null,
        email text not null,

        remote_id integer null,
        auth_provider text null,

        password text null,
        active boolean not null,

        created_at timestamp with time zone NOT NULL DEFAULT now(),
        updated_at timestamp with time zone NOT NULL DEFAULT now()
    );

    CREATE TABLE user_resets (
        id SERIAL PRIMARY KEY,
        user_id integer not null
            references users(id) on update CASCADE on DELETE CASCADE,
        expires timestamp with time zone NOT NULL,
        token text not null,

        created_at timestamp with time zone NOT NULL DEFAULT now(),
        updated_at timestamp with time zone NOT NULL DEFAULT now()
    );

    CREATE TABLE user_profiles (
        user_id integer PRIMARY KEY
            references users(id) on update CASCADE on DELETE CASCADE,
        profile jsonb not null
    );

    CREATE TABLE roles (
        id SERIAL PRIMARY KEY,
        display_name text not null,
        code text not null,

        created_at timestamp with time zone NOT NULL DEFAULT now(),
        updated_at timestamp with time zone NOT NULL DEFAULT now()
    );

    CREATE TABLE user_roles (
        user_id int not null
            references users(id) on update CASCADE on DELETE CASCADE,
        role_id int not null
            references roles(id) on update CASCADE on DELETE CASCADE,
        PRIMARY KEY (user_id, role_id)
    );

    CREATE TABLE permissions (
        id SERIAL PRIMARY KEY,
        display_name text not null,
        code text not null,

        created_at timestamp with time zone NOT NULL DEFAULT now(),
        updated_at timestamp with time zone NOT NULL DEFAULT now()
    );

    CREATE TABLE role_permissions (
        role_id integer not null
            references roles(id) on UPDATE CASCADE on DELETE CASCADE,
        permission_id integer not null
            references permissions(id) on UPDATE CASCADE on DELETE CASCADE,
        PRIMARY KEY (role_id, permission_id)
    );

COMMIT;

---!> MARINER:MIGRATE:DOWN:
BEGIN;

    drop table role_permissions;
    drop table permissions;
    drop table user_roles;
    drop table roles;
    drop table user_profiles;
    drop table user_resets;
    drop table users;

COMMIT;
