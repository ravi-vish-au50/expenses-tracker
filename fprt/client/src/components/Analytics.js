import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransection }) => {
  // category
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  // total transaction
  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <>
      <div className="w-full gap-7 p-5 flex justify-between bg-zinc-200">
        <div className="flex flex-col gap-4 w-[30%]">
          <div className="min-w-[240px] bg-white rounded">
            <div className="border-b p-2 px-3">
              Total Transactions - {totalTransaction}
            </div>
            <div className="p-3">
              <h5 className="mb-2 text-green-700">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-rose-700">
                Expense : {totalExpenseTransactions.length}
              </h5>
            </div>
          </div>
          <div className="min-w-[240px] bg-white rounded">
            <div className="border-b p-2 px-3">
              Total TurnOver - {totalTurnover}
            </div>
            <div className="p-3">
              <h5 className="mb-2 text-green-700">
                Income : {totalIncomeTurnover}
              </h5>
              <h5 className="text-rose-700">
                Expense : {totalExpenseTurnover}
              </h5>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-[70%] gap-7">
          <div className="w-50 rounded">
            <p className="p-2 px-3 bg-green-400 rounded-t">
              Categorywise Income
            </p>

            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && <p className="px-3 py-2 bg-white">{category}</p>
              );
            })}
          </div>
          <div className="w-50">
            <p className="bg-rose-400 p-2 px-3 rounded-t">Categorywise Expense</p>
            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && <p className="px-3 py-2 bg-white">{category}</p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
