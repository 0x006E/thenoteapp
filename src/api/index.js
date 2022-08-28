import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocsFromServer,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  noteConverter,
  subjectConverter,
  topicConverter,
} from "./dataConverters";

const rootCollectionRef = collection(db, "subjects").withConverter(
  subjectConverter
);
const topicCollectionRef = (docId) =>
  collection(db, "subjects", docId, "topics").withConverter(topicConverter);
const noteCollectionRef = (subId, docId) =>
  collection(db, "subjects", subId, "topics", docId, "notes").withConverter(
    noteConverter
  );

export async function getAllDocs() {
  const querySnapshot = await getDocsFromServer(rootCollectionRef);
  const subjects = [];
  for (const doc of querySnapshot.docs) {
    const subject = doc.data();
    const topicQuerySnapshot = await getDocsFromServer(
      topicCollectionRef(subject.id)
    );
    for (const topicDoc of topicQuerySnapshot.docs) {
      const topic = topicDoc.data();
      const noteQuerySnapshot = await getDocsFromServer(
        noteCollectionRef(subject.id, topic.id)
      );
      for (const noteDoc of noteQuerySnapshot.docs) {
        const note = noteDoc.data();
        topic.notes.push(note);
      }
      subject.topics.push(topic);
    }
    subjects.push(subject);
  }

  return { subjects };
}

export async function addSubjectDoc(name) {
  const docRef = await addDoc(rootCollectionRef, name);
  return docRef.id;
}

export async function addNoteDoc(topicId, subjectId, content) {
  const docRef = await addDoc(noteCollectionRef(subjectId, topicId), content);
  return docRef.id;
}

export async function addTopicDoc(subjectId, name) {
  const docRef = await addDoc(topicCollectionRef(subjectId), name);
  return docRef.id;
}

export async function editSubjectDoc(subjectId, name) {
  await setDoc(doc(rootCollectionRef, subjectId), name);
}

export async function editNoteDoc(noteId, topicId, subjectId, content) {
  await setDoc(doc(noteCollectionRef(subjectId, topicId), noteId), content);
}

export async function editTopicDoc(topicId, subjectId, name) {
  await updateDoc(doc(topicCollectionRef(subjectId), topicId), name);
}

export async function removeSubjectDoc(subjectId) {
  await deleteDoc(doc(rootCollectionRef, subjectId));
}

export async function removeNoteDoc(noteId, topicId, subjectId) {
  await deleteDoc(doc(noteCollectionRef(subjectId, topicId), noteId));
}

export async function removeTopicDoc(topicId, subjectId) {
  await deleteDoc(doc(topicCollectionRef(subjectId), topicId));
}
