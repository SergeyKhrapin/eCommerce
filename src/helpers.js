export const getImageSrc = src => `/media/${src}`;

export const getFormattedPrice = price => Number(price).toFixed(2);

export const getProductDetails = (products, id) => products.find(product => parseInt(id) === parseInt(product.id));

export const getPrettyTitle = title => title.replaceAll(/\s/g, '-');
