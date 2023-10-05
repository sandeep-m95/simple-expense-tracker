import React, { useState } from "react";
import "./style.css";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { Navigate, useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransaction();

  const { name, profilePic, isAuth } = useGetUserInfo();

  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
  };

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setTransactionAmount(e.target.value);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>

            {transactionTotals.balance > 0 ? (
              <h2> ${transactionTotals.balance}</h2>
            ) : (
              <h2> -${transactionTotals.balance * -1}</h2>
            )}
          </div>

          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${transactionTotals.totalIncome}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${transactionTotals.totalExpenses}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="add-transaction">
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={handleDescChange}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              value={transactionAmount}
              onChange={handleAmountChange}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={handleTransactionTypeChange}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              onChange={handleTransactionTypeChange}
              checked={transactionType === "income"}
            />
            <label htmlFor="income">Income</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>

        {profilePic && (
          <div className="profile-photo">
            <img src={profilePic} alt="profile-pic" />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="transactions">
        <h3>Transactions</h3>

        <ul>
          {transactions?.map((transaction, index) => {
            const { description, transactionAmount, transactionType } =
              transaction;

            return (
              <li key={index}>
                <h4>{description}</h4>
                <p>
                  {" "}
                  ${transactionAmount} -{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>

                <p></p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ExpenseTracker;
