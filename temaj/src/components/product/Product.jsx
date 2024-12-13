import React, { useEffect, useState } from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { productsUrl, filtersUrl } from "../../utils/consts";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./pagination.scss";
import { ProductCard } from "../";
import MobileFilter from "./MobileFilter";
import { getAllProducts } from "../../api/productApi";
import Filter from "./Filter";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([20, 30]);
  const [filterOptions, setFilterOptions] = useState({
    price: [],
    colors: [],
    finish: [],
    // thickness_cm: [],
    categories: [],
    dimensions: [],
    subceffect: [],
    brand: [],
  });
  const [filters, setFilters] = useState({
    product_name: "",
    brand: "",
    category: "",
    dimensions: "",
    color: "",
    finish: "",
    price__gte: "",
    price__lte: "",
    subceffect: "",
    // thickness_cm__gte: "",
    // thickness_cm__lte: "",
    ordering: "",
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const resetFilters = () => {
    setFilters({
      price__gte: "",
      price__lte: "",
      // thickness_cm__gte: "",
      color: "",
      finish: "",
      category: "",
      dimensions: "",
      subceffect: "",
      brand: "",
      kind: "",
    });
    setPriceRange([20, 30]);
    updateURL({
      price__gte: "",
      price__lte: "",
      // thickness_cm__gte: "",
      color: "",
      finish: "",
      category: "",
      dimensions: "",
      subceffect: "",
      brand: "",
      kind: "",
      page: 1,
    });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const orderingOptions = {
    "Product Name: A-Z": "product_name",
    "Product Name: Z-A": "-product_name",
    "Price: Low-High": "price",
    "Price: High-Low": "-price",
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get(filtersUrl);
      const data = response.data;

      // Filter out null values and remove duplicates
      const unique = (arr) => [...new Set(arr.filter(Boolean))];
      setFilterOptions({
        price: data.price,
        colors: unique(data.colors),
        finish: unique(data.finish),
        // // thickness_cm: unique(data.thickness_cm),
        categories: unique(data.categories),
        dimensions: unique(data.dimensions),
        brand: unique(data.brand),
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchData = async (filters) => {
    const params = { ...filters, page: currentPage };
    try {
      setLoading(true);
      const response = await getAllProducts(params);
      setAllProduct(response.results);
      setTotalProducts(response.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterKey, value) => {
    if (filterKey === "reset") {
      resetFilters(); // Call the reset function directly
      return;
    }

    const newFilters = { ...filters };
    if (newFilters[filterKey] === value) {
      newFilters[filterKey] = ""; // Toggle off
    } else {
      newFilters[filterKey] = value; // Update filter
    }
    updateURL(newFilters, 1);
  
  };

  const handlePriceChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
    const newFilters = {
      ...filters,
      price__gte: newPriceRange[0],
      price__lte: newPriceRange[1],
    };
    updateURL(newFilters, 1);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateURL(filters, 1);
  };

  const updateURL = (newFilters, page = 1) => {
    const updatedFilters = { ...newFilters, page };
    const searchParams = new URLSearchParams(updatedFilters).toString();
    navigate(`?${searchParams}`);
    setFilters(updatedFilters);
    setCurrentPage(page);
  };

  const paginate = (pageNumber) => {
    const newPage = pageNumber.selected + 1;
    setCurrentPage(newPage);
    updateURL(filters, newPage);
  };

  useEffect(() => {
    fetchFilterOptions();
    const params = new URLSearchParams(location.search);
    const newFilters = {};
    params.forEach((value, key) => {
      if (key === "page") {
        setCurrentPage(parseInt(value));
      } else {
        newFilters[key] = value;
      }
    });
    setFilters(newFilters);
    fetchData(newFilters);
  }, [location.search]);

  const toggleMenu = () => {
    setToggleBtn(!toggleBtn);
  };

  return (
    <div
      className="products-wrapper"
      style={{
        marginTop: isSmallDev ? "80px" : "",
      }}
    >
      <div className="products-wrapper-inner">
        <Filter
          filters={filters}
          handleFilterChange={handleFilterChange}
          handlePriceChange={handlePriceChange}
          handleDimsensionFilterChange={handleFilterChange}
          priceRange={priceRange}
          filterOptions={filterOptions}
          resetFilters={resetFilters}
        />
        {isFilterVisible && (
          <MobileFilter
            filters={filters}
            handleFilterChange={handleFilterChange}
            handlePriceChange={handlePriceChange}
            priceRange={priceRange}
            filterOptions={filterOptions}
            toggleFilterVisibility={toggleFilterVisibility}
          />
        )}
        <div className="products-container">
          <div className="filter">
            <p
              style={{
                display: isSmallDev ? "none" : "",
                fontSize: "16px",
                fontWeight: 400,
                color: "#000",
              }}
            >
              {allProduct.count} Produkte
            </p>
            <div className="ordering">
              <Accordion
                sx={{ boxShadow: "none", width: "100%", zIndex: "1111" }}
              >
                <AccordionSummary
                  expandIcon={
                    <button className="expand-icon">
                      <img src="/assets/images/icons/expand.png" alt="" style={{
                        rotate: '180deg'
                      }}/>
                    </button>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <p
                    style={{
                      fontSize: isSmallDev ? "14px" : "18px",
                      fontWeight: 400,
                      color: "#000 !important",
                    }}
                  >
                    {t("sort")}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className="content"
                    style={{
                      border: "none",
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {Object.keys(orderingOptions).map((displayName) => (
                      <button
                        type="button"
                        key={displayName}
                        onClick={() =>
                          handleFilterChange(
                            "ordering",
                            orderingOptions[displayName]
                          )
                        }
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: '#000 !important'
                        }}
                      >
                        {displayName}
                      </button>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <div
              className="ordering"
              style={{
                display: isSmallDev ? "flex" : "none",
              }}
            >
              <button
                onClick={toggleFilterVisibility}
                style={{
                  height: "50px",
                  width: "100px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: '10px',
                  color: '#000 !important',
                }}
              >
                <img
                  src="/assets/images/icons/mob/filter1.png"
                  alt=""
                  style={{
                    height: "15px",
                  }}
                />
                {t("filter")}
              </button>
            </div>
          </div>
          <div className="products-container-inner">
            <Grid container spacing={{ xs: 1, sm: 2, md: 2 }}>
              {allProduct?.map((el) => (
                <Grid item xs={6} sm={6} md={6} lg={4} key={el.id}>
                  <ProductCard product={el} loading={isLoading} />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="pagination-wrapper">
            <ReactPaginate
              previousLabel={isSmallDev ? (
                <img 
                  src="/assets/images/icons/mob/rArrow.png" 
                  alt="Previous" 
                  style={{ width: "20px", height: "20px", rotate: '180deg' }} 
                />
              ) : 'Previous'}
              nextLabel={isSmallDev ? (
                <img 
                  src="/assets/images/icons/mob/rArrow.png" 
                  alt="Previous" 
                  style={{ width: "20px", height: "20px" }} 
                />
              ) : 'Next'}
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={Math.ceil(totalProducts / 12)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={paginate}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              forcePage={currentPage - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
