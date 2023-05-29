const Draft = require("../Module/Draft");

exports.postDraft = (req, res, next) => {
  req.user
    .createDraft(req.body)
    .then((data) => res.status(200).json({ message: "success" }))
    .catch((err) => res.status(401).json({ error: "failed" }));
};

exports.getDraft = (req, res, next) => {
  req.user
    .getDrafts(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(401).json({ error: "failed" }));
};
