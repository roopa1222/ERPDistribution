import dailyexpenseModel from "../db/models/dailyExpense";
import dsrInvoiceModel from "../db/models/dsrInvoice";


export const createDsrInvoice = async (data: object) => {
  console.log('step-1', data);
  const dsrInvoice = await dsrInvoiceModel.create(data);
  return dsrInvoice;
};


export const getAllDsrInvoice = async (branchId?: string, from?: string, to?: string) => {
  // Construct query to filter based on branchId and date range (createdAt)
  let query: any = {};

  // If branchId is provided, filter by branchId
  if (branchId) {
    const mongoose = require('mongoose');
    query.branchId = new mongoose.Types.ObjectId(branchId);
    console.log('Query with branchId:', query);
  }

  // If from and to dates are provided, filter by createdAt date range
  if (from && to) {
    query.createdAt = { 
      $gte: new Date(from), 
      $lte: new Date(to)
    };
  } else if (from) {
    query.createdAt = { 
      $gte: new Date(from)
    };
  } else if (to) {
    query.createdAt = { 
      $lte: new Date(to)
    };
  }
  const sampleExpense = await dailyexpenseModel.findOne({ branchId: query.branchId }).lean();
console.log('Sample expense document:', sampleExpense);

  const dsrData = await dsrInvoiceModel.aggregate([
    // Match first to reduce documents early in the pipeline
    {
      $match: query
    },
    {
      $lookup: {
        from: 'branches',
        localField: 'branchId',
        foreignField: '_id',
        as: 'branchDetails'
      }
    },
    {
      $unwind: {
        path: '$branchDetails',
        preserveNullAndEmptyArrays: true  // Keep documents even if no branch match
      }
    },
    {
      $lookup: {
        from: 'dailyexpenses',
        let: { branchId: '$branchId', date: '$createdAt' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$branchId', '$$branchId'] },
                  { $eq: [{ $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                         { $dateToString: { format: '%Y-%m-%d', date: '$$date' } }] }
                ]
              }
            }
          }
        ],
        as: 'expenseDetails'
      }
    },
    {
      $unwind: {
        path: '$expenseDetails',
        preserveNullAndEmptyArrays: true  // Keep documents even if no expense match
      }
    },
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
        expenseNarration: "$expenseDetails.expenseNarration",
        expenseAmount: "$expenseDetails.expenseAmount",
        openingBalance: "$expenseDetails.openingBalance",
        closingBalance: "$expenseDetails.closingBalance",
        createdAt: { 
          $dateToString: { 
            format: "%Y-%m-%d", 
            date: "$createdAt" 
          } 
        }
      }
    }
  ]);
  return dsrData;
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