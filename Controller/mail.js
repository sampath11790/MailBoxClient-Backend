const Inbox = require("../Module/inbox");
const SentItem = require("../Module/sentmail");
const User = require("../Module/Auth");

exports.PostMail = async (req, res, next) => {
  try {
    const senditem = await req.user.createSenditem({
      To: req.body.To,
      subject: req.body.subject,
      text: req.body.text,
    });

    const inboxUser = await User.findAll({ where: { email: req.body.To } });
    const inbox = inboxUser[0].createInbox({
      From: req.user.email,
      subject: req.body.subject,
      text: req.body.text,
      readreceipt: false,
    });

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(401).json({ error: "failed" });
  }
};

exports.getMail = (req, res, next) => {
  const inbox = req.user.getInboxes();
  const SentItem = req.user.getSenditems();

  Promise.all([inbox, SentItem])
    .then((results) => {
      const [inboxData, sentItemData] = results;
      const combinedData = {
        inbox: inboxData,
        sentItems: sentItemData,
      };
      res.status(200).json(combinedData);
    })
    .catch((err) => res.status(401).json({ error: "failed" }));
};

exports.updateMail = async (req, res, next) => {
  try {
    const inboxitem = req.user
      .getInboxes({ where: { id: req.body.id } })
      .then(async (data) => {
        return await data[0].update({ readreceipt: true });
      })
      .then((datas) => {
        res.status(200).json(datas);
      });
    // res.status(200).json(inboxitem);
  } catch (err) {
    res.status(401).json({ error: "failed" });
  }
};

exports.deleteSentmail = (req, res, next) => {
  req.user

    .getSenditems({ where: { id: req.body.id } })
    .then((data) => data[0].destroy())
    .then((data) => res.status(200).json({ message: "successfully deleted" }))
    .catch((err) => res.status(401).json({ error: "failed" }));
};

exports.deleteinboxmail = (req, res, next) => {
  req.user

    .getInboxes({ where: { id: req.body.id } })
    .then((data) => data[0].destroy())
    .then((data) => res.status(200).json({ message: "successfully deleted" }))
    .catch((err) => res.status(401).json({ error: "failed" }));
};
