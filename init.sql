CREATE TABLE IF NOT EXISTS places (
    id VARCHAR(255) PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    address TEXT NOT NULL,
    creator TEXT NOT NULL
);

INSERT INTO places (id, title, description, lat, lng, address, creator)
VALUES (
    'p1',
    'Empire State Building',
    'One of the most famous sky scrapers in the world!',
    40.7484474,
    -73.9871516,
    '20 W 34th St, New York, NY 10001',
    'u1'
)
ON CONFLICT (id) DO NOTHING;