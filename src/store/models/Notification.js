import { getParent, types } from "mobx-state-tree";

const Notification = types
  .model({
    id: types.identifier,
    message: types.string,
    variant: types.string,
  })
  .actions((self) => {
    function remove() {
      getParent(self, 2).remove(self);
    }

    return { remove };
  });

export default Notification;
