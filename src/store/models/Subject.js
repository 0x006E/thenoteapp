import { flow, getParent, getRoot, types } from "mobx-state-tree";
import { addTopicDoc, editSubjectDoc, removeSubjectDoc } from "../../api";
import Topic from "./Topic";

const Subject = types
  .model("Subject", {
    id: types.identifier,
    name: types.string,
    topics: types.array(Topic),
  })
  .actions((self) => {
    const subjectId = self.id;
    const edit = flow(function* (newName) {
      try {
        const actions = getRoot(self);
        actions.enqueueNotification("Editing subject", "info");
        yield editSubjectDoc(subjectId, { name: newName });
        self.name = newName;
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });
    const addTopic = flow(function* (name) {
      try {
        const actions = getRoot(self);
        actions.enqueueNotification("Adding a new topic", "info");
        const topicId = yield addTopicDoc(subjectId, { name });
        self.topics.push(Topic.create({ id: topicId, name }));
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });
    function removeChild(item) {
      self.topics.remove(item);
    }

    const remove = flow(function* () {
      try {
        const actions = getRoot(self);
        actions.enqueueNotification("Removing subject", "info");
        yield removeSubjectDoc(subjectId);
        getParent(self, 2).remove(self);
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });
    return { edit, remove, removeChild, addTopic };
  });

export default Subject;
