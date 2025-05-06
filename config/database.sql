-- PostgreSQL Example

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL CHECK (LENGTH(name) >= 2 AND LENGTH(name) <= 60),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email LIKE '%@%'),
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8 AND LENGTH(password) <= 16 AND password ~ '.*[A-Z].*' AND password ~ '.*[^a-zA-Z0-9].*'),
    address VARCHAR(400),
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'normal', 'owner')),
    store_id INTEGER REFERENCES stores(id) ON DELETE SET NULL, -- For Store Owners
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    address VARCHAR(400),
    rating DECIMAL(2, 1) DEFAULT 0.0, -- Calculated average
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    UNIQUE (user_id, store_id), -- One rating per user per store
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for faster querying
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_stores_name ON stores (name);
CREATE INDEX idx_stores_address ON stores (address);
CREATE INDEX idx_ratings_user_id ON ratings (user_id);
CREATE INDEX idx_ratings_store_id ON ratings (store_id);
