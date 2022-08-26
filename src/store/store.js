import { destroy, getSnapshot, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { Note, Subject, Topic } from "./models";

const RootStore = types
  .model({
    subjects: types.array(Subject),
    topics: types.array(Topic),
    notes: types.array(Note),
  })
  .actions((self) => {
    function remove(item) {
      console.log(item.id);
      destroy(item);
    }
    function addSubject(name) {
      self.subjects.push(Subject.create({ id: nanoid(), name: name }));
    }
    return { addSubject, remove };
  });

const store = RootStore.create({ subjects: [] });

console.log(getSnapshot(store));
export default store;

// function createRootStore() {
//   return {
//     loading: false,
//     subjects: [],
//     topics: {},

//     toggleLoading: function () {
//       this.loading = !this.loading;
//     },

//     addSubject: function (subjectName) {
//       const subject = {
//         id: this.subjects.length + 1,
//         name: subjectName,
//       };
//       this.subjects.push(subject);
//     },

//     addTopic: function (topic, subject) {
//       const { id, name } = topic;
//       const { id: subjectId } = subject;
//       if (!this.subjects.includes(subjectId))
//         throw new Error("The subject does not exist");
//       if (!Array.isArray(this.topics[subjectId])) this.topics[subjectId] = [];
//       this.topics[subjectId].push({
//         id: id,
//         name: name,
//         notes: [],
//       });
//     },

//     addNote: function (note, topic, subject) {
//       if (!this.topics[subject][topic])
//         throw new Error("The topic or subject does not exist");
//       this.topics[subject][topic].notes.push(note);
//     },

//     editSubject: function (subjectId, newName) {
//       if (!this.subjects.includes(subjectId))
//         throw new Error("The subject does not exist");
//       this.subjects[subjectId].name = newName;
//     },

//     editTopic: function (topicId, subjectId, newName) {
//       if (!this.subjects.includes(subjectId))
//         throw new Error("The subject does not exist");
//       if (!this.topics[subjectId].includes(topicId))
//         throw new Error("The topic does not exist");
//       this.topics[subjectId][topicId].name = newName;
//     },

//     editNote: function (noteId, topicId, subjectId, newContent) {
//       if (!this.subjects.includes(subjectId))
//         throw new Error("The subject does not exist");
//       if (!this.topics[subjectId].includes(topicId))
//         throw new Error("The topic does not exist");
//       if (!this.topics[subjectId][topicId].notes.includes(noteId))
//         throw new Error("The note does not exist");
//       this.topics[subjectId][topicId].notes[noteId].content = newContent;
//     },

//     deleteSubject: function (subjectId) {
//       const subject = this.subjects.find((subject) => subject.id === subjectId);
//       if (!subject) throw new Error("The subject does not exist");
//       this.subjects.splice(this.subjects.indexOf(subject), 1);
//       delete this.topics[subjectId];
//     },

//     deleteTopic: function (topicId, subjectId) {
//       if (!this.topics[subjectId])
//         throw new Error("The topic or subject does not exist");
//       const topic = this.topics[subjectId].find(
//         (topic) => topic.id === topicId
//       );
//       if (!topic) throw new Error("The topic or subject does not exist");
//       this.topics[subjectId].splice(this.topics[subjectId].indexOf(topic), 1);
//     },

//     deleteNote: function (noteId, topicId, subjectId) {
//       if (!this.topics[subjectId])
//         throw new Error("The subject does not exist");
//       if (!this.topics[subjectId][topicId])
//         throw new Error("The topic does not exist");
//       const note = this.topics[subjectId][topicId].notes.find(
//         (note) => note.id === noteId
//       );
//       if (!note) throw new Error("The note does not exist");
//       this.topics[subjectId][topicId].notes.splice(
//         this.topics[subjectId][topicId].notes.indexOf(note),
//         1
//       );
//     },
//   };
// }

// export default createRootStore;
