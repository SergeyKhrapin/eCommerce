import { CURRENCY } from "./constants";

export const getImageSrc = src => `/media/${src}`;

export const getFormattedPrice = (price, multiplier = 1) => CURRENCY + '' + Number(price * multiplier).toFixed(2);

export const getProductDetails = (products, id) => {
    return products.find(product => parseInt(id) === parseInt(product.id)) || {};
    
};

export const getPrettyTitleURL = title => title.replaceAll(/\s/g, '-');
