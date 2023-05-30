const Inbox = require("../Model/inbox");
const SentItem = require("../Model/sentmail");
const User = require("../Model/Auth");

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
  // const userId = req.user.id;

  // User.findAll({
  //   where: { id: userId },
  //   include: [
  //     { model: Inbox, as: "inboxes", order: [["createdAt", "DESC"]] },
  //     { model: SentItem, as: "senditems", order: [["createdAt", "DESC"]] },
  //   ],
  // })
  //   .then((userData) => {
  //     if (userData.length === 0) {
  //       return res.status(404).json({ error: "User not found" });
  //     }

  //     const user = userData[0];
  //     const combinedData = {
  //       inbox: user.inboxes,
  //       sentItems: user.senditems,
  //     };
  //     res.status(200).json(combinedData);
  //   })
  //   .catch((err) => res.status(401).json({ error: "Failed to fetch mail" }));

  const inbox = req.user.getInboxes({ order: [["id", "DESC"]] });
  const SentItem = req.user.getSenditems({ order: [["id", "DESC"]] });

  Promise.all([inbox, SentItem])
    .then((results) => {
      const [inboxData, sentItemData] = results;
      const combinedData = {
        inbox: inboxData,
        sentItems: sentItemData,
      };
      res.status(200).json(combinedData);
    })
    .catch((err) => {
      // console.log(err);
      res.status(401).json({ error: "failed" });
    });
};

exports.updateMail = async (req, res, next) => {
  try {
    const inboxitem = await req.user.getInboxes({ where: { id: req.body.id } });
    const data = await inboxitem[0].update({ readreceipt: true });
    res.status(200).json(data);

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
