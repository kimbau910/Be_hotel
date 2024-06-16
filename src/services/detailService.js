const Detail = require("../models/DetailModel");

const createDetail = (newDetail) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, rating, description, discount } =
      newDetail;
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
        type,
        price,
        rating,
        description,
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

const getAllDetail = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Đảm bảo limit và page là số nguyên
      limit = parseInt(limit, 10);
      page = parseInt(page, 10);

      if (isNaN(limit) || limit <= 0) {
        limit = 2; // Giá trị mặc định nếu limit không hợp lệ
      }
      if (isNaN(page) || page < 0) {
        page = 0; // Giá trị mặc định nếu page không hợp lệ
      }

      // Tạo query object rỗng
      let query = {};

      // Nếu filter có giá trị, thêm vào query object
      if (filter) {
        const [label, value] = filter;
        query[label] = { $regex: value, $options: "i" }; // $options: "i" để không phân biệt chữ hoa chữ thường
      }

      // Tạo options object để phân trang và sắp xếp
      let options = {
        limit: limit,
        skip: page * limit,
        sort: { createdAt: -1, updatedAt: -1 } // Sắp xếp mặc định
      };

      // Nếu sort có giá trị, thêm vào options object
      if (sort && Array.isArray(sort) && sort.length === 2) {
        const [order, field] = sort;
        const sortOrder = parseInt(order, 10);

        if (!isNaN(sortOrder) && (sortOrder === 1 || sortOrder === -1)) {
          options.sort = { [field]: sortOrder, createdAt: -1, updatedAt: -1 };
        } else {
          throw new Error(`Invalid sort value: { order: ${order} }`);
        }
      }

      // Đếm tổng số bản ghi thỏa mãn điều kiện
      const totalDetail = await Detail.countDocuments(query);

      // Tính toán tổng số trang
      const totalPage = Math.ceil(totalDetail / limit);

      // Nếu page vượt quá tổng số trang, đặt lại giá trị page
      if (page >= totalPage) {
        page = totalPage - 1;
      }

      // Tìm kiếm với query và options đã tạo
      const allDetail = await Detail.find(query, null, { ...options, skip: page * limit });

      // Trả về kết quả
      resolve({
        status: "OK",
        message: "Success",
        data: allDetail,
        total: totalDetail,
        pageCurrent: Number(page + 1),
        totalPage: totalPage,
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message,
      });
    }
  });
};


// const getAllDetail = (limit = 2, page = 0) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Đảm bảo limit và page là số nguyên dương
//       limit = parseInt(limit, 10);
//       page = parseInt(page, 10);

//       if (isNaN(limit) || limit <= 0) {
//         limit = 2; // Giá trị mặc định nếu limit không hợp lệ
//       }
//       if (isNaN(page) || page < 0) {
//         page = 0; // Giá trị mặc định nếu page không hợp lệ
//       }

//       // Đếm tổng số bản ghi trong collection
//       const totalDetail = await Detail.countDocuments();

//       // Tìm các bản ghi với phân trang
//       const allDetail = await Detail.find()
//         .limit(limit)
//         .skip(page * limit);

//       // Trả về kết quả
//       resolve({
//         status: "OK",
//         message: "Success",
//         data: allDetail,
//         total: totalDetail,
//         pageCurrent: Number(page + 1),
//         totalPage: Math.ceil(totalDetail / limit),
//       });
//     } catch (e) {
//       reject({
//         status: "ERR",
//         message: e.message,
//       });
//     }
//   });
// };

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
