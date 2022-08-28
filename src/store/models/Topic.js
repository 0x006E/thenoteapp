import { flow, getParent, getRoot, types } from "mobx-state-tree";
import { addNoteDoc, editTopicDoc, removeTopicDoc } from "../../api";
import Note from "./Note";

const Topic = types
  .model("Topic", {
    id: types.identifier,
    name: types.string,
    notes: types.array(Note),
  })
  .actions((self) => {
    const edit = flow(function* (newName) {
      const actions = getRoot(self);
      try {
        actions.enqueueNotification("Editing topic", "info");
        const subjectId = getParent(self, 2).id;
        const topicId = self.id;
        yield editTopicDoc(topicId, subjectId, { name: newName });
        self.name = newName;
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });

    const addNote = flow(function* (content) {
      const actions = getRoot(self);
      try {
        actions.enqueueNotification("Adding a new note", "info");
        const subjectId = getParent(self, 2).id;
        const topicId = self.id;
        const noteId = yield addNoteDoc(topicId, subjectId, { content });
        self.notes.push(Note.create({ id: noteId, content }));
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });
    function removeChild(item) {
      self.notes.remove(item);
    }

    const remove = flow(function* () {
      const actions = getRoot(self);
      try {
        actions.enqueueNotification("Removing topic", "info");
        const subjectId = getParent(self, 2).id;
        const topicId = self.id;
        yield removeTopicDoc(topicId, subjectId);
        getParent(self, 2).removeChild(self);
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });
    return { edit, remove, removeChild, addNote };
  });

export default Topic;
