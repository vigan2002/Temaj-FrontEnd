import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { colors } from "../../utils/color";
import JSZip from "jszip";
import { useAuth } from "../../context/AuthContext";
import { saveAs } from "file-saver";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";
import { useMediaQuery } from "@mui/material";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import { setReviewForProducts, getProductById } from "../../api/productApi";
import {
  getUserWishlist,
  deleteWishlistById,
  addToWishlistById,
} from "../../api/wishlistApi";
import { addToCartById } from "../../api/cartApi";
import Rating from "@mui/material/Rating";
import NotificationModal from "../notification/NotificationModal";
import QuantityPopup from "./QuantityPopup";
import { useTranslation } from "react-i18next";
import { MEDIA_URL } from "../../utils/consts";
import DiscountForm from "./DiscountForm";
import ImageModal from "./gallery/ImageModal";

const Single = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const isMidDev = useMediaQuery("(max-width: 1200px)");
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [inputValue, setInputValue] = useState(1.0);
  const [activeVariationKey, setActiveVariationKey] = useState("");
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [wishlistFetched, setWishlistFetched] = useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const swiperRef = useRef(null);
  const token = Cookies.get("accessToken");
  const [rating, setRating] = useState(0);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(selectedImage);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        const productData = response.data;
        const updatedProduct = productData.map((variation) => {
          const variationKey = Object.keys(variation)[0];
          const variationData = variation[variationKey];
          variationData.photos = variationData.photos.map(
            (photo) => `${MEDIA_URL}${photo}`
          );
          return { [variationKey]: variationData };
        });

        setProduct(updatedProduct);

        const initialVariationKey = Object.keys(updatedProduct[0])[0];
        setActiveVariationKey(initialVariationKey);
        setSelectedVariation(updatedProduct[0][initialVariationKey]);
        setSelectedImage(updatedProduct[0][initialVariationKey].photos[0]);
        setRating(updatedProduct[0][initialVariationKey].rate);
        setLoading(false);
      } catch (error) {
        if (error.response && err.response.status === 404) {
          setError(404);
          navigate("/error", { state: { status: 404 } });
        } else {
          setError(err.response ? err.response.status : 500);
          navigate("/error", {
            state: { status: err.response ? err.response.status : 500 },
          });
        }
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlist = await getUserWishlist();
        const isInWishlist = wishlist.some(
          (item) => item.id === selectedVariation?.id
        );
        setIsInWishlist(isInWishlist);
        setWishlistFetched(true);
      } catch (error) {}
    };

    if (token && selectedVariation && !wishlistFetched) {
      fetchWishlist();
    }
  }, [token, selectedVariation, wishlistFetched]);

  useEffect(() => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.update();
    }
  }, [product, selectedVariation]);

  const handleVariationChange = (variationKey) => {
    const newVariation = product.find((item) => item[variationKey]);
    if (newVariation) {
      setSelectedVariation(newVariation[variationKey]);
      setSelectedImage(newVariation[variationKey].photos[0]);
      setActiveVariationKey(variationKey);
      setRating(newVariation[variationKey].rate);
    }
  };

  const addToWishlist = async () => {
    if (!token) {
      showNotification(`${t("userLogin")}`, "error");
      return;
    }
    if (isInWishlist) {
      try {
        setIsInWishlist(false);
        const response = await deleteWishlistById(selectedVariation.id);
        showNotification(`${t("prodDeleteWish")}`, "success");
      } catch (error) {
        setIsInWishlist(true);
        showNotification(`${t("prodDeleteWishErr")}`, "error");
      }
    } else {
      try {
        setIsInWishlist(true);
        const response = await addToWishlistById(selectedVariation.id);
        showNotification(`${t("prodAddWish")}`, "success");
      } catch (error) {
        setIsInWishlist(false);
        showNotification(`${t("prodAddWishErr")}`, "error");
      }
    }
  };

  const addToCart = async () => {
    if (!token) {
      showNotification(`${t("userLogin")}`, "error");
      return;
    }

    if (!inputValue || isNaN(inputValue) || inputValue <= 0) {
      showNotification(`${t("putM2")}`, "error");
      return;
    }

    try {
      const response = await addToCartById(selectedVariation.id, inputValue);
      showNotification(`${t("prodAddCart")}`, "success");
      setIsPopupVisible(true);
    } catch (error) {
      showNotification(`${t("prodAddCartErr")}`, "error");
    }
  };

  const addToCartQuantity = async () => {
    if (!token) {
      showNotification(`${t("userLogin")}`, "error");
      return;
    }

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      showNotification(`${t("putM2")}`, "error");
      return;
    }

    try {
      const response = await addToCartById(selectedVariation.id, quantity);
      showNotification(`${t("prodAddCart")}`, "success");
      setIsPopupVisible(true);
    } catch (error) {
      showNotification(`${t("prodAddCartErr")}`, "error");
    }
  };

  const buyNow = async () => {
    setIsPopupVisible(true);
    if (!token) {
      showNotification(`${t("userLogin")}`, "error");
      return;
    }

    if (!inputValue || isNaN(inputValue) || inputValue <= 0) {
      showNotification(`${t("putM2")}`, "error");
      return;
    }

    try {
      const response = await addToCartById(selectedVariation.id, inputValue);
      showNotification(`${t("prodAddCart")}`, "success");
      setTimeout(() => {
        navigate(`/receipt`);
      }, 2000);
    } catch (error) {
      showNotification(`${t("prodAddCartErr")}`, "error");
    }
  };

  const buyNowQuantity = async () => {
    setIsPopupVisible(true);

    if (!token) {
      showNotification(`${t("userLogin")}`, "error");
      return;
    }

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      showNotification(`${t("putM2")}`, "error");
      return;
    }

    try {
      const response = await addToCartById(selectedVariation.id, quantity);
      showNotification(`${t("prodAddCart")}`, "success");
      setTimeout(() => {
        navigate(`/receipt`);
      }, 2000);
    } catch (error) {
      showNotification(`${t("prodAddCartErr")}`, "error");
    }
  };

  const calculateAdjustedQuantity = (dimensions, requestedQuantity) => {
    try {
      const [length, height] = dimensions
        .toLowerCase()
        .replace("cm", "")
        .replace(" ", "")
        .split("x")
        .map(Number);

      const baseSurfaceCm2 = length * height;
      const baseSurfaceM2 = baseSurfaceCm2 / 10000;

      requestedQuantity = parseFloat(requestedQuantity);

      if (requestedQuantity % baseSurfaceM2 !== 0) {
        return (
          Math.ceil(requestedQuantity / baseSurfaceM2) * baseSurfaceM2
        ).toFixed(4);
      }

      return requestedQuantity.toFixed(4);
    } catch (error) {
      showNotification(`${t("invalidDim")}`, "error");
      return requestedQuantity;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const adjustedQuantity = calculateAdjustedQuantity(
      selectedVariation.dimensions,
      value
    );
    setMaxValue(adjustedQuantity);
  };

  const downloadImagesAsZip = async (images, productName) => {
    const zip = new JSZip();
    const imgFolder = zip.folder("images");

    try {
      const imagePromises = images.map(async (url, index) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            console.warn(`Skipping image at ${url}: Failed to fetch`);
            return;
          }
          const blob = await response.blob();
          const ext = url.split(".").pop();
          imgFolder.file(`${productName}-${index + 1}.${ext}`, blob);
        } catch (error) {
          console.warn(`Skipping image at ${url}: Error fetching image`, error);
        }
      });

      await Promise.all(imagePromises);

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `${productName}-images.zip`);
    } catch (error) {
      showNotification("Failed to generate ZIP file", "error");
    }
  };

  const variationKeys = product.map((item) => Object.keys(item)[0]);

  const handleRatingChange = async (event, newValue) => {
    if (newValue === null) return;
    try {
      setRating(newValue);
      await setReviewForProducts(selectedVariation.id, newValue);
      VNotification(`${t("tyRate")}`, "success");
    } catch (error) {
      showNotification(`${t("tyRateErr")}`, "error");
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!selectedVariation) {
    return <div>Product not found.</div>;
  }
  const slidesPerView = 4;
  const totalSlides = 4;

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedVariation.product_name,
          text: `Check out this product: ${selectedVariation.product_name}`,
          url: window.location.href,
        });
      } catch (error) {}
    }
  };

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const productName = selectedVariation.product_name.replace(/^Pllake, /i, "");
  const formattedName = toTitleCase(productName);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="single-wrapper">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div
        className="single-container"
        style={{
          marginBottom: isSmallDev ? "" : "100px",
        }}
      >
        <div
          className="left"
          style={{
            minHeight: isSmallDev ? "" : "800px",
            display: isMidDev ? "" : "flex",
          }}
        >
          <div
            className="photo-list"
            style={{ display: isMidDev ? "none" : "flex" }}
          >
            <Swiper
              breakpoints={{
                340: { slidesPerView: 1, spaceBetween: "10px" },
                700: { slidesPerView, spaceBetween: "10px" },
              }}
              direction={"vertical"}
              className="mySwiper"
              style={{
                width: "100%",
              }}
            >
              {selectedVariation.photos.map((photo, index) => (
                <SwiperSlide id="swipeslides" key={index}>
                  <img
                    src={photo}
                    alt=""
                    onClick={() => setSelectedImage(photo)}
                    className={selectedImage === photo ? "selected" : ""}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </SwiperSlide>
              ))}
              {Array.from({
                length: totalSlides - selectedVariation.photos.length,
              }).map((_, index) => (
                <SwiperSlide id="swipeslides" key={`placeholder-${index}`}>
                  <div className="placeholder"></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className="photo-container"
            style={{ width: isMidDev ? "100%" : "70%" }}
          >
            {selectedVariation.discount && (
              <div className="promotion">
                <p>- {selectedVariation.discount}%</p>
              </div>
            )}
            <img
              src={selectedImage}
              alt="Selected"
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => openModal(selectedImage)}
            />
          </div>
          <div
            className="photo-list-mobile"
            style={{
              display: isMidDev ? "flex" : "none",
              height: "100px",
            }}
          >
            <Swiper
              breakpoints={{
                340: { slidesPerView: 4, spaceBetween: "10px" },
                700: { slidesPerView: 4, spaceBetween: "10px" },
              }}
              ref={swiperRef}
              loop={true}
              freeMode={true}
              modules={[Autoplay, FreeMode]}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "var(--bck-color)",
              }}
            >
              {selectedVariation.photos.map((photo, index) => (
                <SwiperSlide id="swipeslides" key={index}>
                  <img
                    src={photo}
                    alt=""
                    onClick={() => setSelectedImage(photo)}
                    className={selectedImage === photo ? "selected" : ""}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div
          className="right"
          style={{
            minHeight: "800px",
            height: "max-content",
            backgroundColor: "#fff",
          }}
        >
          <div className="right-inner">
            <p style={{ color: "var(--dark-color)" }}>
              {selectedVariation.product_unique_code}
            </p>
            <div className="product-title">
              <h1>{formattedName}</h1>
              {user?.user_id ? (
                <button className="light-btn" onClick={addToWishlist}>
                  <svg
                    id="wishlist-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="34"
                    height="34"
                    fill={isInWishlist ? "var(--primary-color)" : "none"}
                    stroke="black"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                  Wishlist
                </button>
              ) : null}
            </div>
            {selectedVariation.kind === "Pllake" && (
              <p style={{ fontSize: "16px", fontWeight: "500", color: "#000" }}>
                {t("dimensions")}: {selectedVariation.dimensions} cm
              </p>
            )}
            <div className="product-dimensions">
              <div className="buttons">
                {selectedVariation.kind === "Pllake" ? (
                  <>
                    {variationKeys.map((key) => (
                      <button
                        className={`transparentD-btn ${
                          activeVariationKey === key ? "active" : ""
                        }`}
                        key={key}
                        onClick={() => handleVariationChange(key)}
                      >
                        {key}
                      </button>
                    ))}
                  </>
                ) : (
                  <p>{selectedVariation.dimensions}</p>
                )}
              </div>
              <div className="rate">
                <Rating
                  name="read-only"
                  value={selectedVariation.rate ?? 4.5}
                  readOnly
                />
                <p>{selectedVariation.rate ?? 4.5} nga 5 yje</p>
              </div>
            </div>
            <div className="product-colors">
              <button
                style={{
                  backgroundColor:
                    colors[selectedVariation.color] || "transparent",
                }}
              />
            </div>
            <div className="product-price">
              {selectedVariation.kind === "Pllake" ? (
                <h1>
                  <span>
                    {t("price")} per m
                    <sup
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      2
                    </sup>
                    :
                  </span>
                </h1>
              ) : (
                <h1>
                  <span>{t("price")}:</span>
                </h1>
              )}
              {selectedVariation.discount && (
                <h1 className="discount">
                  {
                    // maxValue *
                    (
                      selectedVariation.price *
                      (1 - selectedVariation.discount / 100)
                    ).toFixed(2)
                  }{" "}
                  €
                </h1>
              )}
              <h1 className={selectedVariation.discount ? "before" : ""}>
                {!isNaN(Number(selectedVariation.price))
                  ? Number(selectedVariation.price).toFixed(2)
                  : "N/A"}
                €
              </h1>
            </div>
            {selectedVariation.kind === "Pllake" ? (
              <div className="product-quantity">
                <div className="input-value">
                  <div className="q-input">
                    <input
                      type="number"
                      placeholder="1.00"
                      value={inputValue}
                      onChange={handleInputChange}
                      defaultValue={1}
                    />
                    <p>
                      m<sup>2</sup>
                    </p>
                  </div>
                </div>
                <p>
                  {t("quantityM2")}{" "}
                  {formatNumber(
                    calculateAdjustedQuantity(
                      selectedVariation.dimensions,
                      inputValue
                    )
                  )}{" "}
                  m²
                </p>
              </div>
            ) : (
              <div className="product-quantity">
                <div className="input-value">
                  <div className="quantity-controls">
                    <button onClick={decrement}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increment}>+</button>
                  </div>
                </div>
              </div>
            )}
            <div className="product-price">
              <h1>
                <span>{t("total")}:</span>
              </h1>
              {selectedVariation.kind === "Pllake"
                ? selectedVariation.discount && (
                    <h1 className="discount">
                      {(
                        inputValue *
                        selectedVariation.price *
                        (1 - selectedVariation.discount / 100)
                      ).toFixed(2)}{" "}
                      €
                    </h1>
                  )
                : selectedVariation.discount && (
                    <h1 className="discount">
                      {(
                        quantity *
                        selectedVariation.price *
                        (1 - selectedVariation.discount / 100)
                      ).toFixed(2)}{" "}
                      €
                    </h1>
                  )}
              <h1 className={selectedVariation.discount ? "before" : ""}>
                {selectedVariation.kind === "Pllake" ? (
                  <>
                    {(
                      Number(inputValue) * Number(selectedVariation.price)
                    ).toFixed(2)}{" "}
                    €
                  </>
                ) : (
                  <>
                    {(
                      Number(quantity) * Number(selectedVariation.price)
                    ).toFixed(2)}{" "}
                    €
                  </>
                )}
              </h1>
            </div>
            <div className="product-functions">
              {selectedVariation.kind === "Pllake" ? (
                <button className="primary-btn" onClick={addToCart}>
                  <img src="/assets/images/icons/cartB.png" alt="" />
                  {t("addCart")}
                </button>
              ) : (
                <button className="primary-btn" onClick={addToCartQuantity}>
                  <img src="/assets/images/icons/cartB.png" alt="" />
                  {t("addCart")}
                </button>
              )}
              {selectedVariation.kind === "Pllake" ? (
                <button
                  className="transparent-btn"
                  style={{
                    color: "#000",
                  }}
                  onClick={buyNow}
                >
                  {t("buyNow")}
                </button>
              ) : (
                <button
                  className="transparent-btn"
                  style={{
                    color: "#000",
                  }}
                  onClick={buyNowQuantity}
                >
                  {t("buyNow")}
                </button>
              )}

              <button className="whatsapp-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
                  />
                </svg>
                whatsapp
              </button>
              <button
                className="transparentD-btn"
                style={{
                  border: "1px solid #000",
                  color: "#000",
                }}
                onClick={shareProduct}
              >
                <img src="/assets/images/icons/share.png" alt="" />
                {t("share")}
              </button>
              {selectedVariation.kind === "Pllake" && (
                <>
                  {selectedVariation.photos === null
                    ? null
                    : (user?.group === "Architect" ||
                        user?.group === "superuser") && (
                        <button
                          className="darker-btn"
                          onClick={() =>
                            downloadImagesAsZip(
                              selectedVariation.photos,
                              selectedVariation.product_name
                            )
                          }
                          style={{
                            width: "100%",
                          }}
                        >
                          Download
                        </button>
                      )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="single-container" style={{ height: "100%" }}>
        <div className="left">
          <h1> {t("specs")}</h1>
          <div
            style={{
              borderTop: "1px solid #cccccc",
              borderBottom: "1px solid #cccccc",
              padding: "10px 0",
              marginTop: "10px",
            }}
          >
            <div className="spec-box">
              <h1>{t("type")}</h1>
              <div>
                <p>{selectedVariation.kind}</p>
              </div>
            </div>
            <div className="spec-box">
              <h1>{t("color")}</h1>
              <div>
                <p>{selectedVariation.color}</p>
              </div>
            </div>
            <div className="spec-box">
              <h1>{t("finish")}</h1>
              <p>{selectedVariation.finish}</p>
            </div>
            <div className="spec-box">
              <h1>{t("categories")}</h1>
              <div>
                <p>{selectedVariation.base_category}</p>
              </div>
            </div>
            <div className="spec-box">
              <h1>{t("dimensions")}</h1>
              <div>
                <p>{selectedVariation.dimensions}</p>
              </div>
            </div>
            {selectedVariation.brand === null ? null : (
              <div className="spec-box">
                <h1>Brandi</h1>
                <p>{selectedVariation.brand}</p>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <div className="right-inner">
            <div className="rate-container">
              <Rating
                name="simple-controlled"
                value={selectedVariation.rate}
                onChange={handleRatingChange}
              />
              <p>
                {selectedVariation.rate === null ? "0" : selectedVariation.rate}{" "}
                nga 5 yje
              </p>
            </div>
          </div>
          {user?.group === "superuser" && (
            <div className="sale-section">
              <DiscountForm productId={selectedVariation.id} />
            </div>
          )}
        </div>
      </div>
      {isModalOpen && selectedImage && (
        <ImageModal closeModal={closeModal} image={selectedImage} />
      )}
    </div>
  );
};

export default Single;
