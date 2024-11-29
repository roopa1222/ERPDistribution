import mongoose from "mongoose";
import dailyexpenseModel from "../db/models/dailyExpense";

export const createDailyexpense = async (data: object) => {
  const dailyexpense = await dailyexpenseModel.create(data);
  return dailyexpense;
};

export const updateDailyexpense = async (id: string, data: object) => {
  const dailyexpense = await dailyexpenseModel.findByIdAndUpdate( { _id: id }, data, { new: true });
  return dailyexpense;
};

export const getDailyExpenseDetails = async (branchId?: string, startDate?: string, endDate?: string) => {
  const matchConditions: any = {};

  // Add branchId condition if provided
  if (branchId) {
    const mongoose = require('mongoose');
    matchConditions.branchId = new mongoose.Types.ObjectId(branchId);
    console.log('Query with branchId:', matchConditions);
  }

  // Add date range condition if provided
  if (startDate || endDate) {
    matchConditions.expenseDate = {};
    if (startDate) {
      matchConditions.expenseDate.$gte = new Date(startDate);
    }
    if (endDate) {
      matchConditions.expenseDate.$lte = new Date(endDate);
    }
  }

  // Perform the aggregation
  const expenses = await mongoose.model('dailyExpense').aggregate([
    {
      $match: matchConditions,
    },
    {
      $lookup: {
        from: 'branch', // Name of the branch collection
        localField: 'branchId',
        foreignField: '_id',
        as: 'branchDetails',
      },
    },
    {
      $unwind: {
        path: '$branchDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0, // Exclude `_id` from the result
        expenseName: 1,
        expenseAmount: 1,
        branchId: '$branchDetails._id',
        branchName: '$branchDetails.branchName',
        createdAt: { 
          $dateToString: { 
            format: "%Y-%m-%d", 
            date: "$createdAt" 
          } 
        }
      },
    },
  ]);

  return expenses;
};

export const getDailyBalanceDetails = async (branchId?: string, startDate?: string, endDate?: string) => {
  const matchConditions: any = {};

  // Add branchId condition if provided
  if (branchId) {
    const mongoose = require('mongoose');
    matchConditions.branchId = new mongoose.Types.ObjectId(branchId);
    console.log('Query with branchId:', matchConditions);
  }

  // Add date range condition if provided
  if (startDate || endDate) {
    matchConditions.expenseDate = {};
    if (startDate) {
      matchConditions.expenseDate.$gte = new Date(startDate);
    }
    if (endDate) {
      matchConditions.expenseDate.$lte = new Date(endDate);
    }
  }

  // Perform the aggregation
  const expenses = await mongoose.model('dailyExpense').aggregate([
    {
      $match: matchConditions,
    },
    {
      $lookup: {
        from: 'branch', // Name of the branch collection
        localField: 'branchId',
        foreignField: '_id',
        as: 'branchDetails',
      },
    },
    {
      $unwind: {
        path: '$branchDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0, // Exclude `_id` from the result
        openingBalance: 1,
        closingBalance: 1,
        branchId: '$branchDetails._id',
        branchName: '$branchDetails.branchName',
        createdAt: { 
          $dateToString: { 
            format: "%Y-%m-%d", 
            date: "$createdAt" 
          } 
        }
      },
    },
  ]);

  return expenses;
};