import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';

const Payment = () => {

    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientsecret, setClientsecret] = useState();
    //by the client secret the stripe will get to know how much we charge to user

    useEffect(() => {
        const getClientsecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies subunits 
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`//query param
            });
            setClientsecret(response.data.clientsecret);
        }
        getClientsecret();
    }, [basket]);

    const handleSubmit = async e => {
        e.preventDefault();//stop from refreshing
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientsecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent== payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            //did't use push coz we don't want the user to come back to payment page
            history.replace('/orders')
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout {<Link to="/checkout">{basket?.length} items</Link>}
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>delievery address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p></p>
                        <p></p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and delievery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Subtotal: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
