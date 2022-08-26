import { getParent, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import Topic from "./Topic";

const Subject = types
  .model({
    id: types.identifier,
    name: types.string,
    topics: types.array(Topic),
  })
  .actions((self) => {
    function edit(newName) {
      self.name = newName;
    }
    function addTopic(name) {
      self.topics.push(
        Topic.create({
          id: nanoid(),
          subject: self.id,
          name: name,
        })
      );
    }
    function remove() {
      getParent(self, 2).remove(self);
    }
    return { edit, remove, addTopic };
  });

export default Subject;
