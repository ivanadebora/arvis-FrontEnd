import {
    SELECT_PRODUCT,
} from './types';

export const select_product = (selectedProduct) => {
    return {
        type: SELECT_PRODUCT,
        payload: selectedProduct
    }
}