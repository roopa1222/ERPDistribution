import dailyexpenseModel from "../db/models/dailyExpense";

export const createDailyexpense = async (data: object) => {
  const dailyexpense = await dailyexpenseModel.create(data);
  return dailyexpense;
};

export const updateDailyexpense = async (id: string, data: object) => {
  const dailyexpense = await dailyexpenseModel.findByIdAndUpdate( { _id: id }, data, { new: true });
  return dailyexpense;
};