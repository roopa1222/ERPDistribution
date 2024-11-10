import dailyExpenceModel from "../db/models/dailyExpence";

export const createDailyExpence = async (data: object) => {
  const dailyExpence = await dailyExpenceModel.create(data);
  return dailyExpence;
};

export const updateDailyExpence = async (id: string, data: object) => {
  const dailyExpence = await dailyExpenceModel.findByIdAndUpdate( { _id: id }, data, { new: true });
  return dailyExpence;
};