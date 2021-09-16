import { Router } from "express";
import { secureRequest } from "../../middleware/route-protector";
import { performSearch } from "./search/middle-ware/get.search";
import { searchQueryParameterValidator, validate } from "./validators";

const router: Router = Router();

router.get(
  "/",
  secureRequest,
  searchQueryParameterValidator(),
  validate,
  performSearch
);

export default router;
