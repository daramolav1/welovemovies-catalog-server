const service = require("./reviews.service");

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function update(req, res) {
  const review = res.locals.review;

  const updatedReview = {
    ...req.body.data,
    review_id: review.review_id,
  };

  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res) {
  const { review_id } = res.locals.review;

  await service.delete(review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
