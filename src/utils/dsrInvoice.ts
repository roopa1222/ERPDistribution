import { log } from "winston";
import dailyExpenceModel from "../db/models/dailyExpence";
import dsrInvoiceModel from "../db/models/dsrInvoice";


export const createDsrInvoice = async (data: object) => {
  console.log('step-1', data);
  const dsrInvoice = await dsrInvoiceModel.create(data);
  return dsrInvoice;
};

export const getAllDsrInvoice = async (branchId?: string, from?: string, to?: string, limit: number = 5, offset: number = 0) => {
  try {
    let query: any = {};

    // If branchId is provided, filter by branchId
    if (branchId) {
      const mongoose = require('mongoose');
      query.branchId = new mongoose.Types.ObjectId(branchId);
    }

    // If from and to dates are provided, filter by createdAt date range
    if (from && to) {
      const startDate = new Date(new Date(from).setHours(0, 0, 0, 0)); // Start of the day
      const endDate = new Date(new Date(to).setHours(23, 59, 59, 999)); // End of the day

      query.createdAt = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const pipeline = [
      // Match the query to reduce documents early
      { $match: query },
      
      // Lookup to join with the branches collection
      {
        $lookup: {
          from: 'branches',
          localField: 'branchId',
          foreignField: '_id',
          as: 'branchDetails'
        }
      },
      
      // Unwind the branchDetails to flatten the data
      {
        $unwind: {
          path: '$branchDetails',
          preserveNullAndEmptyArrays: true  // Preserve documents even if no branch match
        }
      },
      
      // Project the necessary fields
      {
        $project: {
          _id: 1,
          productName: 1,
          serialNo: 1,
          category: 1,
          paymentDetails: 1,
          financeDetails: 1,
          customerName: 1,
          customerMobileNo: 1,
          paymentMode: 1,
          totalAmount: 1,
          branchName: '$branchDetails.branchName',
          createdAt: {
            $dateToString: {
              format: "%d-%m-%Y", 
              date: "$createdAt"
            }
          }
        }
      },
      
      // Pagination logic (limit and skip)
      { $skip: offset },
      { $limit: limit }
    ];

    // Fetch the data with pagination (limit and skip)
    const dsrData = await dsrInvoiceModel.aggregate(pipeline);

    // Get total count of documents matching the query
    const totalDocuments = await dsrInvoiceModel.aggregate([
      ...pipeline.slice(0, -2), // Exclude skip and limit stages for count
      { $count: "totalCount" }
    ]);

    const dataCount = totalDocuments.length > 0 ? totalDocuments[0].totalCount : 0;

    return { dsrData, dataCount };

  } catch (error) {
    console.error('Error fetching invoice data:', error);
    throw new Error('Failed to fetch DS invoice data');
  }
};


export const updateDsrInvoice = async (id: string, data: object) => {
  const dsrInvoice = await dsrInvoiceModel.findByIdAndUpdate( { _id: id }, data, { new: true });
  return dsrInvoice;

};

export const getMobileCount = async (branchId?: string, startDate?: string, endDate?: string) => {
  let query: any = {
    category: 'MOBILE'
  };

  if (branchId) {
    const mongoose = require('mongoose');
    query.branchId = new mongoose.Types.ObjectId(branchId);
  }

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      query.createdAt.$lte = new Date(endDate);
    }
  }

  const count = await dsrInvoiceModel.countDocuments(query);
  return  count ;
};

export const getAccessoriesCount = async (branchId?: string, startDate?: string, endDate?: string) => {
  let query: any = {
    category: 'ACCESSORIES'
  };

  if (branchId) {
    const mongoose = require('mongoose');
    query.branchId = new mongoose.Types.ObjectId(branchId);
  }

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      query.createdAt.$lte = new Date(endDate);
    }
  }

  const count = await dsrInvoiceModel.countDocuments(query);
  return count;
};

export const getElectronicCount = async (branchId?: string, startDate?: string, endDate?: string) => {
  let query: any = {
    category: 'ELECTRONICS'
  };

  if (branchId) {
    const mongoose = require('mongoose');
    query.branchId = new mongoose.Types.ObjectId(branchId);
  }

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      query.createdAt.$lte = new Date(endDate);
    }
  }

  const count = await dsrInvoiceModel.countDocuments(query);
  return count ;
};