import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  startAfter,
  where,
  type WhereFilterOp,
} from "firebase/firestore";
import { app } from "./app";
import {
  toUDocument,
  toURDocument,
  toURDocuments,
  type UDocument,
  type URDocument,
} from "@/types/firebase";

export const db = getFirestore(app);

export const getURDocument = async <T>(ref: DocumentReference) => {
  const snapShot = await getDoc(ref);
  return toURDocument<T>(snapShot);
};

export const getURDocumentWithId = async <T>(col: string, document: string) => {
  const colRef = doc(db, col, document);
  const snapShot = await getDoc(colRef);
  return toURDocument<T>(snapShot);
};

export const getURDocuments = async <T>(col: string) => {
  const colRef = collection(db, col);
  const snapShot = await getDocs(colRef);
  return toURDocuments<T>(snapShot);
};

export const getorderedURDocuments = async <T>(col: string) => {
  const colRef = collection(db, col);
  const queryRef = query(colRef, orderBy("timestamp", "asc"));
  const snapshot = await getDocs(queryRef);
  return toURDocuments<T>(snapshot);
};
export const getURDocumentsQuery = async <T>(
  col: string,
  conditions: Array<[string, WhereFilterOp, string]>,
  last: number
) => {
  const wheres = [] as QueryFieldFilterConstraint[];
  conditions.forEach((condition) =>
    wheres.push(where(condition[0], condition[1], condition[2]))
  );
  const colRef = collection(db, col);
  const queryRef = query(
    colRef,
    ...wheres,
    orderBy("timestamp", "desc"),
    startAfter(last)
  );
  const snapShot = await getDocs(queryRef);
  return toURDocuments<T>(snapShot);
};

export const addUDocument = async <T>(
  col: string,
  data: URDocument<T> | UDocument<T>
) => {
  const colRef = collection(db, col);
  const uDocument = "id" in data ? toUDocument(data) : data;
  const docRef = await addDoc(colRef, uDocument);
  return { ...data, id: docRef.id } as URDocument<T>;
};

export const removeDocument = async (col: string, document: string) => {
  const docRef = doc(db, col, document);
  return await deleteDoc(docRef).then(() => true);
};

export const listener = <T>(
  col: string,
  start: number,
  callback: (data: URDocument<T>[]) => void
) => {
  const colRef = collection(db, col);
  const queryRef = query(
    colRef,
    where("timestamp", ">=", start),
    orderBy("timestamp", "desc")
  );
  return onSnapshot(queryRef, (snapshot) => {
    const data = toURDocuments<T>(snapshot);
    callback(data);
  });
};
