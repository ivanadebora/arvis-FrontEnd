import { 
    SELECT_PRODUCT
   } from '../actions/types'

const INITIAL_STATE = {id: 0, nama: '', merk: '', jenis:'', harga: 0, img: '', description: ''};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECT_PRODUCT :
            return action.payload; 
        default:
            return state;
    }
}