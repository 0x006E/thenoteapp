import { collection, getDocsFromServer } from "firebase/firestore";
import { db } from "../firebaseConfig";

const collectionRef = collection(db, "subjects");

async function getAllDocs() {
  try {
    const querySnapshot = await await getDocsFromServer(collectionRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (err) {
    console.log("hello", err);
  }
}
// export default SubjectAPI = {
//   get,
// };

export default hello;
