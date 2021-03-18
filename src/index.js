import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Table } from './components/table/Table';
import { Header } from './components/header/Header';
import { Formula } from './components/formula/Formula';
import { Toolbar } from './components/toolbar/Toolbar';
import { storage } from './core/utils';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, storage('excel-state'));

store.subscribe((state) => {
  console.log('App', state);
  storage('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
