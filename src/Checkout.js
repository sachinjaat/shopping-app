import React from 'react'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal';

function Checkout() {
    const [{ basket, user }] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="" alt="" />
                {basket?.length == 0 ? (
                    <div>
                        <h2>Your Basket is empty</h2>
                    </div>
                ) : (
                        <div>
                            <h3>Hello, {user?.email}</h3>
                            <h2 className="checkout__title">Your Shopping Basket</h2>
                            {basket?.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                        </div>
                    )}
            </div>
            {basket.length > 0 && (
                <div className="checkout__right">
                    <Subtotal />
                </div>
            )}
        </div>
    )
}

export default Checkout
