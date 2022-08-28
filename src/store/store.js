import { applySnapshot, destroy, flow, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { addSubjectDoc, getAllDocs } from "../api";
import { Notification, Subject } from "./models";

const RootStore = types
  .model("RootStore", {
    loading: types.optional(types.boolean, true),
    online: types.optional(types.boolean, true),
    subjects: types.array(Subject),
    notifications: types.array(Notification),
  })
  .actions((self) => {
    const actions = {
      fetchData: flow(function* fetchData() {
        try {
          actions.setLoading(true);
          actions.enqueueNotification("Connecting to firestore", "info");
          const data = yield getAllDocs();
          applySnapshot(self, data);
          actions.setLoading(false);
          actions.enqueueNotification("Fetching data done!", "success");
        } catch (error) {
          console.log(error);
          actions.enqueueNotification("Fetching data failed!", "error");
          actions.enqueueNotification(
            "You are most likely offline!",
            "warning"
          );
          actions.setConnectionStatus(false);
        }
      }),
      setLoading(state) {
        self.loading = state;
      },
      setConnectionStatus(state) {
        self.online = state;
      },
      remove(item) {
        destroy(item);
      },
      addSubject: flow(function* (name) {
        try {
          actions.enqueueNotification("Adding a new subject", "info");
          const subjectId = yield addSubjectDoc({ name });
          self.subjects.push(Subject.create({ id: subjectId, name }));
          actions.enqueueNotification("Push to firestore  - done!", "success");
        } catch (error) {
          console.log(error);
          actions.enqueueNotification("Push failed!", "error");
        }
      }),
      enqueueNotification(message, variant) {
        self.notifications.push(
          Notification.create({ id: nanoid(), message, variant })
        );
      },
    };
    return actions;
  });

const store = RootStore.create({
  loading: true,
  online: true,
  subjects: [],
  notifications: [],
});
// onSnapshot(store, (snapshot) => console.log("Snapshot: ", snapshot));
export default store;
