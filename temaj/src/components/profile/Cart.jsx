import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { wishlistUrl } from "../../utils/consts";
import { Grid } from "@mui/material";
import Navigator from './Navigator';
import ProductCard from "../card/ProductCard";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const token = Cookies.get("accessToken");

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = () => {
        axios.get(wishlistUrl, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => {
            const productsFromResponse = response.data.map((item) => ({
                ...item.product,
                wishlistItemId: item.id,
            }));
            setProducts(productsFromResponse);
        }).catch(error => {
            console.error("Wishlist Error fetching data:", error);
        });
    };

    const deleteAllProducts = () => {
        axios.delete(`${wishlistUrl}all`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(() => {
            setProducts([]);
        }).catch(error => {
            console.error("Error removing all products from wishlist:", error);
        });
    };

    const deleteProduct = (wishlistItemId) => {
        axios.delete(`${wishlistUrl}${wishlistItemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(() => {
            fetchWishlist();
        }).catch(error => {
            console.error(`Error removing product with wishlist item id ${wishlistItemId} from wishlist:`, error);
        });
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <Navigator activeTab="cart" />
                <div className="content">
                    <div className="wish-list-inner">
                        <div className="title">
                            <h1>Shporta</h1>
                            <button className="transparentD-btn" onClick={deleteAllProducts}>
                                Fshij të gjitha
                            </button>
                        </div>
                        <div className="wish-list-container">
                            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                                {products.map((el) => (
                                    <Grid item xs={6} sm={6} md={4} key={el.wishlistItemId}>
                                        <ProductCard product={el} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
