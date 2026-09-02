import * as productService from "../services/productService.js";

// GET /api/products
export async function listProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:slug
export async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with slug "${slug}"`,
      });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:id/variants
export async function getProductVariants(req, res, next) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id "${id}"`,
      });
    }

    const variants = await productService.getVariantsByProductId(id);
    res.status(200).json({ success: true, data: variants });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:id/emi-plans
export async function getProductEmiPlans(req, res, next) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id "${id}"`,
      });
    }

    const emiPlans = await productService.getEmiPlansByProductId(id);
    res.status(200).json({ success: true, data: emiPlans });
  } catch (error) {
    next(error);
  }
}
