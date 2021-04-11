import db from "../firebase";

export const getUserByID = (userID) => {
  return db.collection("users").doc(`${userID}`).get();
};

/* export const isMatched = (userIDOne, userIDTwo) => {
  db.collection("chats")
    .where("participant_ids", "array-contains", `${userIDOne}`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.filter((doc) => {
        doc.data().participant_ids.includes(userIDTwo);
      });
    });
};
 */
