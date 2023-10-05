import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    totalIncome: 0.0,
    totalExpenses: 0.0,
  });

  const { userId } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");

  const getTransactions = async () => {
    let unsubscribed;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      unsubscribed = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({
            ...data,
            id,
          });
          if (data.transactionType === "expense") {
            totalExpenses += +data.transactionAmount;
          } else {
            totalIncome += +data.transactionAmount;
          }
        });

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance: balance,
          totalIncome,
          totalExpenses,
        });
      });
    } catch (err) {
      console.log(err);
    }
    return () => unsubscribed();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};
