import { flow, getParent, types } from "mobx-state-tree";
import { editNoteDoc, removeNoteDoc } from "../../api";

const Note = types
  .model("Note", {
    id: types.identifier,
    content: types.string,
  })
  .actions((self) => {
    const edit = flow(function* (newContent) {
      try {
        const subjectId = getParent(self, 4).id;
        const topicId = getParent(self, 2).id;
        const noteId = self.id;
        yield editNoteDoc(noteId, topicId, subjectId, { content: newContent });
        self.content = newContent;
      } catch (error) {
        console.log(error);
      }
    });
    const remove = flow(function* () {
      try {
        const subjectId = getParent(self, 4).id;
        const topicId = getParent(self, 2).id;
        const noteId = self.id;

        yield removeNoteDoc(noteId, topicId, subjectId);
        getParent(self, 2).removeChild(self);
      } catch (error) {
        console.log(error);
      }
    });

    return { edit, remove };
  });

export default Note;
