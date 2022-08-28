import { types } from "mobx-state-tree";

const Notification = types.model("Notification", {
  id: types.identifier,
  message: types.string,
  variant: types.string,
});

export default Notification;
