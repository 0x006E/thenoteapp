import { getParent, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import Note from "./Note";

const Topic = types
  .model({
    id: types.identifier,
    name: types.string,
    notes: types.array(Note),
  })
  .actions((self) => {
    function edit(newName) {
      self.name = newName;
    }

    function addNote(content) {
      self.notes.push(
        Note.create({
          id: nanoid(),
          topic: self.id,
          content: content,
        })
      );
    }
    function removeChild(item) {
      self.notes.remove(item);
    }
    function remove() {
      getParent(self, 2).removeChild(self);
    }
    return { edit, remove, removeChild, addNote };
  });

export default Topic;
