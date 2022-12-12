import React from 'react';
import { Grid, Typography,Container,CircularProgress  } from '@material-ui/core';
import FilterProduct from "../FilterProduct";

import Product from '../Product/Product';
import useStyles from './styles';

const Products = ({ categories, onAddToCart }) => {
    const classes = useStyles();
    const [searchResult, setSearchResult] = React.useState([]);
    if (!categories.length) return <CircularProgress />;

    // return(
    //     <div>
    //         <Banner />
    //         <div id ="products">
    //             <div classname = "contents">
    //                 {categories.map((category) => {
    //                     return (
    //                         <Container>
    //                             <Typography classname= "headline" variant= "h3" component= "h2">
    //                                 {category.name}
    //                             </Typography>
    //                             <Grid container justify="center" spacing={4}>
    //                                 {category.prodcutsData.map((product) => (
    //                                     <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
    //                                       <Product product={product} onAddToCart={onAddToCart} />
    //                                     </Grid>
    //                                 ))}
    //                         </Container>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <main className={classes.content}>
        <FilterProduct
        onAddToCart={onAddToCart}
        categories={categories}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
            <div className={classes.toolbar} />
                {categories.map((category,index) => {
                    return (
                        <div className='contents'
                        style={{
                            padding: 20,
                            backgroundImage:
                            index % 2 !== 0
                            ? 'linear-gradient(to bottom right, #3d4a5d,#3d4a5d,#bb86fc)'
                            : "",
                        }}
                        >
                        <Container>
                            <Typography classname= "headline" variant= "h3" component= "h2">
                            {category.name}
                           </Typography>
                        <Grid container justify="center" spacing={4}>
                        {category.productsData.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} onAddToCart={onAddToCart} />
                            </Grid>
                        ))}
                    </Grid>
                   </Container>
                   </div>
                    );
                })};
        </main>
    );
};

export default Products;