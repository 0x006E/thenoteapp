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
        actions.enqueueNotification("Editing note", "info");
        const subjectId = getParent(self, 4).id;
        const topicId = getParent(self, 2).id;
        const noteId = self.id;
        yield editNoteDoc(noteId, topicId, subjectId, { content: newContent });
        self.content = newContent;
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });
    const remove = flow(function* () {
      try {
        actions.enqueueNotification("Removing topic", "info");
        const subjectId = getParent(self, 4).id;
        const topicId = getParent(self, 2).id;
        const noteId = self.id;

        yield removeNoteDoc(noteId, topicId, subjectId);
        getParent(self, 2).removeChild(self);
        actions.enqueueNotification("Push to firestore  - done!", "success");
      } catch (error) {
        console.log(error);
        actions.enqueueNotification("Push failed!", "error");
      }
    });

    return { edit, remove };
  });

export default Note;
