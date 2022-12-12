import React, { useState, useEffect } from 'react'
import { getOwnBalance } from './Web3Client';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [categories, setCategory] = useState([]);
    const [cart, setCart] = useState({});
    const [balance, setBalance] = useState(0);

    const fetchBalance = () => {
		getOwnBalance()
			.then((balance) => {
				setBalance(balance);
			})
			.catch((err) => {
				console.log(err);
			});
	};

    const fetchProducts = async () => {
        const { data: products } = await commerce.products.list();
        const { data: catData } = await commerce.categories.list();
        const ppcat = catData.reduce((acc, category) => {
            return [
                ...acc,
                {
                    ...category,
                    productsData: products.filter((product) =>
                      product.categories.find((cat) => cat.id === category.id)
                    ),
                },  
            ];
        }, []);
        setCategory(ppcat);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }
    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.remove();

        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    

    return (
        <Router>
            <div classname= "App">
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products categories={categories} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart 
                            cart={cart} 
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />                    
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart} />
                    </Route>
                </Switch>
                {/* <p>Your balance is {balance}</p>
                <button onClick={() => fetchBalance()}>Refresh balance</button> */}
            </div>
        </Router>
    );
}

export default App;
