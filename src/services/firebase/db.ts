import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  startAfter,
  where,
} from "firebase/firestore";
import { app } from "./app";
import { NEWS, SOURCE } from "@/constant";

export const db = getFirestore(app);

export const getSources = async () => {
  const colRef = collection(db, SOURCE);
  const snapShot = await getDocs(colRef);
  return snapShot.docs.map((i) => ({ ...i.data(), id: i.id } as USource));
};

export const getNews = async (
  source: string,
  category: string,
  last = Date.now()
) => {
  const wheres = [] as QueryFieldFilterConstraint[];
  if (source) wheres.push(where("siteCode", "==", source));
  if (category) wheres.push(where("categoryCode", "==", category));
  const colRef = collection(db, NEWS);
  const queryRef = query(
    colRef,
    ...wheres,
    orderBy("timestamp", "desc"),
    startAfter(last),
    limit(10)
  );
  const snapShot = await getDocs(queryRef);
  return snapShot.docs.map((i) => ({ ...i.data(), id: i.id } as UNews));
};
