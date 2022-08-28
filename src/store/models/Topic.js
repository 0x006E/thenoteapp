import { flow, getParent, types } from "mobx-state-tree";
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
      try {
        const subjectId = getParent(self, 2).id;
        const topicId = self.id;
        yield editTopicDoc(topicId, subjectId, { name: newName });
        self.name = newName;
      } catch (error) {
        console.log(error);
      }
    });

    const addNote = flow(function* (content) {
      try {
        const subjectId = getParent(self, 2).id;
        const topicId = self.id;
        const noteId = yield addNoteDoc(topicId, subjectId, { content });
        self.notes.push(Note.create({ id: noteId, content }));
      } catch (error) {
        console.log(error);
      }
    });
    function removeChild(item) {
      self.notes.remove(item);
    }

    const remove = flow(function* () {
      try {
        const subjectId = getParent(self, 2).id;
        const topicId = self.id;
        yield removeTopicDoc(topicId, subjectId);
        getParent(self, 2).removeChild(self);
      } catch (error) {
        console.log(error);
      }
    });
    return { edit, remove, removeChild, addNote };
  });

export default Topic;
