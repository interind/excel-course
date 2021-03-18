import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Table } from './components/table/Table';
import { Header } from './components/header/Header';
import { Formula } from './components/formula/Formula';
import { Toolbar } from './components/toolbar/Toolbar';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, {
  colState: {},
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
