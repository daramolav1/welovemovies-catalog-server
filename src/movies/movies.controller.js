const service = require("./movies.service");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res) {
  const { is_showing } = req.query;

  is_showing
    ? res.json({ data: await service.listIsShowing() })
    : res.json({ data: await service.list() });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function listTheaters(req, res) {
  const data = await service.listTheaters(req.params.movieId);
  res.json({ data });
}

async function listReviews(req, res) {
  const data = await service.listReviews(req.params.movieId);
  res.json({ data });
}

module.exports = {
  list,
  read: [movieExists, read],
  listTheaters,
  listReviews,
};
