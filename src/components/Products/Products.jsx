import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';

const products = [
    { id: 1, name: 'Shoes', description: 'Running Shoes.', price: '$5', image: 'https://www.bhphotovideo.com/images/images2500x2500/apple_mre82ll_a_13_3_macbook_air_with_1441816.jpg' },
    { id: 2, name: 'Macbook', description: 'Apple Macbook.', price: '$10', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/rfb-macbook-air-space-gray-select-201902?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1548454547040' },
];

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products;