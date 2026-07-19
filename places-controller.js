const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const pool = require("../db");

// Helper function to keep the API response the same
const formatPlace = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  location: {
    lat: row.lat,
    lng: row.lng,
  },
  address: row.address,
  creator: row.creator,
});

// GET /api/places/:pid
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const result = await pool.query("SELECT * FROM places WHERE id = $1", [
      placeId,
    ]);

    if (result.rows.length === 0) {
      return next(
        new HttpError("Could not find a place with the provided place id.", 404)
      );
    }

    res.json({ place: formatPlace(result.rows[0]) });
  } catch (err) {
    return next(new HttpError("Database error.", 500));
  }
};

// GET /api/places/user/:uid
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const result = await pool.query("SELECT * FROM places WHERE creator = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return next(
        new HttpError("Could not find places for the provided user id.", 404)
      );
    }

    res.json({
      places: result.rows.map(formatPlace),
    });
  } catch (err) {
    return next(new HttpError("Database error.", 500));
  }
};

// POST /api/places
const createPlace = async (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const id = uuid();

  try {
    await pool.query(
      `INSERT INTO places
      (id, title, description, lat, lng, address, creator)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        title,
        description,
        coordinates.lat,
        coordinates.lng,
        address,
        creator,
      ]
    );

    const createdPlace = {
      id,
      title,
      description,
      location: coordinates,
      address,
      creator,
    };

    res.status(201).json({ place: createdPlace });
  } catch (err) {
    return next(new HttpError("Creating place failed.", 500));
  }
};

// PATCH /api/places/:pid
const updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  try {
    const result = await pool.query(
      `UPDATE places
       SET title = $1,
           description = $2
       WHERE id = $3
       RETURNING *`,
      [title, description, placeId]
    );

    if (result.rows.length === 0) {
      return next(new HttpError("Could not find place for this id.", 404));
    }

    res.status(200).json({
      place: formatPlace(result.rows[0]),
    });
  } catch (err) {
    return next(new HttpError("Updating place failed.", 500));
  }
};

// DELETE /api/places/:pid
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const result = await pool.query("DELETE FROM places WHERE id = $1", [
      placeId,
    ]);

    if (result.rowCount === 0) {
      return next(new HttpError("Could not find place for this id.", 404));
    }

    res.status(200).json({
      message: "Deleted Place",
    });
  } catch (err) {
    return next(new HttpError("Deleting place failed.", 500));
  }
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
