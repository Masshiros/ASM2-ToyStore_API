import Toy from "../models/Toy.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";

// @desc Create new toy
// @route POST /api/v1/toys
// @access private

export const createNewToy = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    ages,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;
  // check toy exist
  const existToy = await Toy.findOne({ name });
  if (existToy) {
    throw new Error("Toy already exists");
  }
  // find category
  const foundCategory = await Category.findOne({
    name: category,
  });
  if (!foundCategory) {
    throw new Error(
      "Category not found, please create category first or check category name"
    );
  }
  // find brand
  const foundBrand = await Brand.findOne({
    name: brand.toLowerCase(),
  });
  if (!foundBrand) {
    throw new Error(
      "Brand not found, please create brand first or check brand name"
    );
  }

  // create new toy
  const toy = await Toy.create({
    name,
    description,
    category,
    ages,
    colors,
    user: req.userAuthID,
    price,
    totalQty,
    brand,
    images: req.files.map((file) => file.path),
  });
  // push into category

  foundCategory.toys.push(toy._id);
  // resave
  foundCategory.save();
  // push into brand

  foundBrand.toys.push(toy._id);
  // resave
  foundBrand.save();
  // res
  res.json({
    status: "success",
    msg: "Toy created successfully",
    toy,
  });
});

// @desc GET all toy
// @route GET /api/v1/toys
// @access public

export const getToys = asyncHandler(async (req, res) => {
  //query
  let toyQuery = Toy.find();
  //search by name
  if (req.query.name) {
    toyQuery = toyQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  // search by brand
  if (req.query.brand) {
    toyQuery = toyQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  // search by category
  if (req.query.category) {
    toyQuery = toyQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  // search by colors
  if (req.query.colors) {
    toyQuery = toyQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }
  // search by ages
  if (req.query.ages) {
    toyQuery = toyQuery.find({
      ages: { $regex: req.query.ages, $options: "i" },
    });
  }
  // filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    toyQuery = toyQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }
  // pagination
  // page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 1;
  // start
  const start = (page - 1) * limit;
  // end
  const end = page * limit;
  // total
  const total = await Toy.countDocuments();
  toyQuery = toyQuery.skip(start).limit(limit);
  // pagination result
  const pagination = {};
  if (end < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (start > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  // await the query
  const toys = await toyQuery.populate("reviews");

  res.json({
    status: "success",
    total,
    results: toys.length,
    pagination,
    message: "Toy fetched successfully",
    toys,
  });
});

// @desc GET one toy
// @route GET /api/v1/toys/:id
// @access public
export const getOneToy = asyncHandler(async (req, res) => {
  const toy = await Toy.findById(req.params.id).populate("reviews");
  if (!toy) {
    throw new Error("Can not find that toy");
  } else {
    res.json({
      status: "success",
      message: "Toy found",
      toy,
    });
  }
});

// @desc UPDATE toy
// @route PUT /api/v1/toys/:id
// @access private/admin

export const updateOneToy = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    ages,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;
  // update
  const toy = await Toy.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      ages,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Toy updated successfully",
    toy,
  });
});

// @desc DELETE toy
// @route DELETE /api/v1/toys/:id
// @access private/admin

export const deleteToy = asyncHandler(async (req, res) => {
  await Toy.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Toy deleted successfully",
  });
});
