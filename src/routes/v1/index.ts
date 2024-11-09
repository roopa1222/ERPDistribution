import { Router } from "express";
import dotenv from 'dotenv';
import authRoute from '../v1/auth-routes';

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
];



// Setting the production route
productionRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
  
export default router;