import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import createSagaMiddleware from 'redux-saga';

import { IItemsState } from './modules/items/types';

import rootReducer from './modules/rootReducer';
// import rootSaga from './modules/rootSaga';

export interface IState {
  items: IItemsState;
}

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

const store = createStore(rootReducer);

// sagaMiddleware.run(rootSaga);

export default store;
