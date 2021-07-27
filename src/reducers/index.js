import { combineReducers } from 'redux';
import SelectProductReducers from './SelectProductReducers';


export default combineReducers({
    selectedProduct: SelectProductReducers
})