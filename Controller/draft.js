const Draft = require("../Model/Draft");

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

exports.deleteDraft = (req, res, next) => {
  req.user
    .getDrafts({ where: { id: req.body.id } })
    .then((data) => data[0].destroy())
    .then((data) => res.status(200).json({ message: "successfully deleted" }))
    .catch((err) => res.status(401).json({ error: "failed" }));
};
