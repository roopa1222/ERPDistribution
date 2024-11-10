import { Router } from "express";
import dotenv from 'dotenv';
import authRoute from '../v1/auth-routes';
import branchRoute from '../v1/branch-routes';
import dsrInvoiceRoute from "../v1/dsrInvoice-routes";
import dailyExpenceRoute from "../v1/dailyExpence-routes.ts";

const router = Router();
dotenv.config();
const environment = process.env.NODE_ENV || 'development';
interface IRoutes {
  path: string,
  route: Router
}


// Production Routes
const productionRoutes: IRoutes[] = [

  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/branch',
    route: branchRoute,
  },

  {
    path: '/dsrInvoice',
    route: dsrInvoiceRoute,
  },
  {
    path: '/dailyExpence',
    route: dailyExpenceRoute,

  }
];



// Setting the production route
productionRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
  
export default router;