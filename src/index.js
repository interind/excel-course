import { Router } from './core/routes/Router';
import { DashboardPage } from './pages/DashboardPage';
import { ExcelPage } from './pages/ExcelPage';
import './scss/index.scss';


const route = new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});

route.init();
