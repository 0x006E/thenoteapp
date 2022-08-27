import { getParent, types } from "mobx-state-tree";

const Note = types
  .model({
    id: types.identifier,
    content: types.string,
  })
  .actions((self) => {
    function edit(newContent) {
      self.content = newContent;
    }
    function remove() {
      getParent(self, 2).removeChild(self);
    }

    return { edit, remove };
  });

export default Note;
