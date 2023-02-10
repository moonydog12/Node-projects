const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price');

  res.status(200).json({ products, nbHits: products.length });
};

// Dynamic approach
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  // 數字符篩選
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|<=|=|>=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // Sort function
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createAt');
  }

  // Fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  // 計算要被跳過的資料量
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbhits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
