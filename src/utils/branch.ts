import branchModel from "../db/models/branch";

export const getAllBranches = async () => {
  const branches = await branchModel.find({});
  return branches;
};

export const createBranches = async (data: object) => {
  const addBranches = await branchModel.create(data);
  return addBranches;
};

export const getBranchById = async (id: string) => {
  const branch = await branchModel.findById(id);
  return branch;
};