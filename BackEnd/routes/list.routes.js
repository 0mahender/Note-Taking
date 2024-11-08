const exprees = require("express");
const { ListModel } = require("../models/list.model");
const { auth } = require("../middlewares/auth.middleware");

const listRoutes = exprees.Router();

listRoutes.use(auth);
listRoutes.post("/create", async (req, res) => {
  try {
    const list = ListModel(req.body);
    await list.save();
    res.json({ msg: "New List has been created", createdList: list });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

listRoutes.get("/", async (req, res) => {
  try {
    const lists = await ListModel.find({ userId: req.body.userId });
    res.json({ msg: `${req.body.user} lists`, lists });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

listRoutes.get("/onenote/:listId", async (req, res) => {
    const { listId } = req.params;
    try {
      const lists = await ListModel.findOne({_id:listId});
      res.json({ msg: `${req.body.user} lists`, lists });
    } catch (error) {
      res.json({ msg: error.message });
    }
  });

listRoutes.patch("/update/:listId", async (req, res) => {
  const { listId } = req.params;
  const userId = req.body.userId;
  try {
    const list = await ListModel.findOne({ _id: listId });

    const userIdInList = list.userId;

    console.log("req.body",req.body)

    if (userId === userIdInList) {
      await ListModel.findByIdAndUpdate({ _id: listId }, req.body);
      res.json({ msg: `${list.listName} has been Changed` });
    } else {
      res.json({ msg: "not aurhorized!" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

listRoutes.delete("/delete/:listId", async (req, res) => {
  const { listId } = req.params;
  const userId = req.body.userId;
  try {
    const list = await ListModel.findOne({ _id: listId });

    const userIdInList = list.userId;

    if (userId === userIdInList) {
      await ListModel.findByIdAndDelete({ _id: listId });
      res.json({ msg: `Deleted` });
    } else {
      res.json({ msg: "not aurhorized!" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = {
  listRoutes,
};
