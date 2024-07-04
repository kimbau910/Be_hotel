const Detail = require("../models/DetailModel");

const createDetail = (newDetail) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      image1,
      image2,
      image3,
      imageMap,
      type,
      price,
      rating,
      description,
      overview,
      convenient,
      discount,
    } = newDetail;
    try {
      const checkDetail = await Detail.findOne({
        name: name,
      });
      if (checkDetail !== null) {
        resolve({
          status: "ERR",
          message: "The name of Detail is already",
        });
      }
      const newDetail = await Detail.create({
        name,
        image,
        image1,
        image2,
        image3,
        imageMap,
        type,
        price,
        rating,
        description,
        overview,
        convenient,
        discount: Number(discount),
      });
      if (newDetail) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newDetail,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateDetail = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkDetail = await Detail.findOne({
        _id: id,
      });
      if (checkDetail === null) {
        resolve({
          status: "ERR",
          message: "The Detail is not defined",
        });
      }

      const updatedDetail = await Detail.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedDetail,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkDetail = await Detail.findOne({
        _id: id,
      });
      if (checkDetail === null) {
        resolve({
          status: "ERR",
          message: "The Detail is not defined",
        });
      }

      await Detail.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete Detail success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyDetail = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Detail.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete Detail success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const detail = await Detail.findOne({
        _id: id,
      });
      if (detail === null) {
        resolve({
          status: "ERR",
          message: "The Detail is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: detail,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllDetail = async (limit, page, sort, filter) => {
  try {
    const totalDetail = await Detail.countDocuments(); // Đảm bảo sử dụng countDocuments thay vì count
    let allDetail = [];

    if (filter && filter.length > 0) {
      const label = filter[0];
      const allObjectFilter = await Detail.find({
        [label]: { $regex: filter[1] },
      })
        .limit(limit)
        .skip(page * limit)
        .sort({ createdAt: -1, updatedAt: -1 });

      return {
        status: "OK",
        message: "Success",
        data: allObjectFilter,
        total: totalDetail,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalDetail / limit),
      };
    } else if (sort && sort.length > 0) {
      const objectSort = {};
      objectSort[sort[1]] = sort[0];

      const allDetailSort = await Detail.find()
        .limit(limit)
        .skip(page * limit)
        .sort(objectSort)
        .sort({ createdAt: -1, updatedAt: -1 });

      return {
        status: "OK",
        message: "Success",
        data: allDetailSort,
        total: totalDetail,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalDetail / limit),
      };
    } else {
      if (!limit) {
        allDetail = await Detail.find().sort({ createdAt: -1, updatedAt: -1 });
      } else {
        allDetail = await Detail.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }

      return {
        status: "OK",
        message: "Success",
        data: allDetail,
        total: totalDetail,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalDetail / limit),
      };
    }
  } catch (e) {
    return {
      status: "ERROR",
      message: e.message,
      data: [],
    };
  }
};


const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Detail.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createDetail,
  updateDetail,
  getDetail,
  deleteDetail,
  getAllDetail,
  deleteManyDetail,
  getAllType,
};
