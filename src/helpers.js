import { CURRENCY, ONE_PRODUCT_MAX_QUANTITY_IN_CART } from "./constants";

export const getImageSrc = src => `/media/${src}`;

export const getFormattedPrice = (price, multiplier = 1) => CURRENCY + '' + Number(price * multiplier).toFixed(2);

export const getProductDetails = (products, id) => {
    return products.find(product => parseInt(id) === parseInt(product.id)) || {};
    
};

export const getPrettyTitleURL = title => title.split(' ').join('-');

export const increaseQuantity = (quantity, handler) => {
    if (quantity < ONE_PRODUCT_MAX_QUANTITY_IN_CART) {
        handler();
    }
};

export const decreaseQuantity = (quantity, handler) => {
    if (quantity > 1) {
        handler();
    }
};
