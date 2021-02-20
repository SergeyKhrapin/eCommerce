import { COLOR } from "../constants";
import { getImageSrc, getFormattedPrice } from "../helpers";
import './ProductItem.scss';

const CartItem = ({product}) => {
    const { product: {id, image, brand, title, price, color},
            quantity } = product;
    const imageSrc = getImageSrc(image);
    const priceValue = getFormattedPrice(price, quantity);

    return (
        <div className="ProductItem">
            <div className="row">
                <div className="col-6">
                    <div className="ProductItem-details">
                        <img
                            className="ProductItem-details--image"
                            src={imageSrc}
                            alt={`${brand} - ${title}`} />
                        <div>
                            <p className="ProductItem-details--brand">{brand}</p>
                            <h3 className="ProductItem-details--title text-dark">{title}</h3>
                            <p>{color ? `${COLOR}: ${color}` : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="ProductItem-quantity">{quantity}</div>
                </div>
                <div className="col-2">
                    <p className="ProductItem-price">{priceValue}</p>
                </div>
                <div className="col-2">
                    <button
                        className="ProductItem-remove">
                        x
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
