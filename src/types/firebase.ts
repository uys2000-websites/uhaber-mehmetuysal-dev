import type {
  QuerySnapshot,
  DocumentSnapshot,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";

export interface UDocument<T> {
  data: T;
  timestamp: number;
  utimestamp: number;
}

export interface URDocument<T> {
  id: string;
  data: T;
  timestamp: number;
  utimestamp: number;
}

export const toURDocuments = <T>(
  query: QuerySnapshot<DocumentData, DocumentData>
): URDocument<T>[] => {
  return query.docs.map((document) => toURDocument(document));
};

export const toURDocument = <T>(
  document: DocumentSnapshot<DocumentData, DocumentData>
): URDocument<T> => {
  return {
    id: document.id,
    ...(document.data() as UDocument<T>),
  };
};

export const toUDocument = <T>(document: URDocument<T>): UDocument<T> => {
  return {
    data: document.data,
    timestamp: document.timestamp,
    utimestamp: document.utimestamp,
  };
};
