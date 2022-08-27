import { destroy, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { Note, Notification, Subject, Topic } from "./models";

const RootStore = types
  .model({
    subjects: types.array(Subject),
    topics: types.array(Topic),
    notes: types.array(Note),
    notifications: types.array(Notification),
  })
  .actions((self) => {
    const actions = {
      remove: function (item) {
        destroy(item);
      },
      addSubject: function (name) {
        self.subjects.push(Subject.create({ id: nanoid(), name: name }));
      },
    };
    return actions;
  });

const store = RootStore.create({ subjects: [], notifications: [] });

export default store;
