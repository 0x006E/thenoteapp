import { flow, getParent, types } from "mobx-state-tree";
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
        yield editSubjectDoc(subjectId, { name: newName });
        self.name = newName;
      } catch (error) {
        console.log(error);
      }
    });
    const addTopic = flow(function* (name) {
      try {
        const topicId = yield addTopicDoc(subjectId, { name });
        self.topics.push(Topic.create({ id: topicId, name }));
      } catch (error) {
        console.log(error);
      }
    });
    function removeChild(item) {
      self.topics.remove(item);
    }

    const remove = flow(function* () {
      try {
        yield removeSubjectDoc(subjectId);
        getParent(self, 2).remove(self);
      } catch (error) {
        console.log(error);
      }
    });
    return { edit, remove, removeChild, addTopic };
  });

export default Subject;
