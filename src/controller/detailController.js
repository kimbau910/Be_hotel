const DetailService = require("../services/detailService");

const createDetail = async (req, res) => {
  try {
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
    } = req.body;
    if (!name || !type || !price || !rating) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is requiredd",
      });
    }
    const response = await DetailService.createDetail(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateDetail = async (req, res) => {
  try {
    const DetailId = req.params.id;
    const data = req.body;
    if (!DetailId) {
      return res.status(200).json({
        status: "ERR",
        message: "The DetailId is required",
      });
    }
    const response = await DetailService.updateDetail(DetailId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const DetailId = req.params.id;
    if (!DetailId) {
      return res.status(200).json({
        status: "ERR",
        message: "The DetailId is required",
      });
    }
    const response = await DetailService.getDetail(DetailId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteDetail = async (req, res) => {
  try {
    const DetailId = req.params.id;
    if (!DetailId) {
      return res.status(200).json({
        status: "ERR",
        message: "The DetailId is required",
      });
    }
    const response = await DetailService.deleteDetail(DetailId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await DetailService.deleteManyDetail(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllDetail = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await DetailService.getAllDetail(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await DetailService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createDetail,
  updateDetail,
  getDetail,
  deleteDetail,
  getAllDetail,
  deleteMany,
  getAllType,
};
