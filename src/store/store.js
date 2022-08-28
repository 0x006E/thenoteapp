import {
  applySnapshot,
  destroy,
  flow,
  onSnapshot,
  types,
} from "mobx-state-tree";
import { addSubjectDoc, getAllDocs } from "../api";
import { Notification, Subject } from "./models";

const RootStore = types
  .model("RootStore", {
    loading: types.optional(types.boolean, true),
    subjects: types.array(Subject),
    notifications: types.array(Notification),
  })
  .actions((self) => {
    const actions = {
      fetchData: flow(function* fetchData() {
        const data = yield getAllDocs();
        applySnapshot(self, data);
        actions.toggleLoading();
      }),
      toggleLoading() {
        self.loading = !self.loading;
      },
      remove(item) {
        destroy(item);
      },
      addSubject: flow(function* (name) {
        try {
          const subjectId = yield addSubjectDoc({ name });
          self.subjects.push(Subject.create({ id: subjectId, name }));
        } catch (error) {
          console.log(error);
        }
      }),
    };
    return actions;
  });

const store = RootStore.create({
  loading: true,
  subjects: [],
  notifications: [],
});
onSnapshot(store, (snapshot) => console.log("Snapshot: ", snapshot));
export default store;
