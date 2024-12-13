import React, { useState } from "react";
import "./mobilefilter.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

const MobileFilter = ({
  filters,
  handleFilterChange,
  handlePriceChange,
  priceRange,
  filterOptions,
  toggleFilterVisibility,
}) => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit(event);
  };

  return (
    <div className="filter-card-mobile">
      <button
        className="close-btn"
        style={{
          backgroundColor: "var(--bck-color)",
        }}
        onClick={toggleFilterVisibility}
      >
        <IoMdClose color="var(--darker-color)" fontSize={"25px"} />
      </button>
      <form
        className="filter-wrapper"
        style={{
          display: isSmallDev ? "flex" : "none",
          width: "80%",
          alignItems: "center",
          justifyContent: "flex-start",
          overflowY: "auto",
        }}
        onSubmit={onSubmit}
      >
        <div
          className="filter-container"
          style={{
            backgroundColor: "var(--bck-color)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "kind"}
              onChange={handleAccordionChange("kind")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("kind")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {[`${t("pllake")}`, `${t("sanitary")}`].map((kind) => (
                    <button
                      type="button"
                      key={kind}
                      className={filters.kind === kind ? "active" : ""}
                      onClick={() => handleFilterChange("kind", kind)}
                      style={{
                        color: "#000 !important",
                      }}
                    >
                      
                      {t(kind)}
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "subceffect"}
              onChange={handleAccordionChange("subceffect")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("subceffect")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {[`${t("beton")}`, `${t("mermer")}`, `${t("dimensionXXL")}`, `${t("smallDimensions")}`].map((subceffect) => (
                    <button
                      type="button"
                      key={subceffect}
                      className={filters.subceffect === subceffect ? "active" : ""}
                      onClick={() => handleFilterChange("subceffect", subceffect)}
                      style={{
                        color: "#000 !important",
                      }}
                    >
                      
                      {t(subceffect)}
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "price"}
              onChange={handleAccordionChange("price")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("price")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="price-content">
                  <button
                    style={{
                      color: "#000 !important",
                    }}
                  >
                    {priceRange[0]}
                  </button>
                  -
                  <button
                    style={{
                      color: "#000 !important",
                    }}
                  >
                    {priceRange[1]}
                  </button>
                </div>
                <Slider
                  getAriaLabel={() => "price range"}
                  value={priceRange}
                  onChange={handlePriceChange}
                  defaultValue={[20, 30]}
                  step={1}
                  min={Math.min(...filterOptions.price)}
                  max={Math.max(...filterOptions.price)}
                  sx={{ color: "var(--primary-color)", mt: "10px" }}
                />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "finish"}
              onChange={handleAccordionChange("finish")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#000 !important",
                  }}
                >
                  {t("finish")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {filterOptions.finish.map((finish) => (
                    <button
                      type="button"
                      key={finish}
                      className={filters.finish === finish ? "active" : ""}
                      onClick={() => handleFilterChange("finish", finish)}
                      style={{
                        color: "#000 !important",
                      }}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "color"}
              onChange={handleAccordionChange("color")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("color")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {filterOptions.colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={filters.color === color ? "active" : ""}
                      onClick={() => handleFilterChange("color", color)}
                      style={{
                        color: "#000 !important",
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "thickness"}
              onChange={handleAccordionChange("thickness")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("thickness")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {filterOptions.thickness_cm.map((thickness) => (
                    <button
                      type="button"
                      key={thickness}
                      className={
                        filters.thickness_cm__gte === thickness ? "active" : ""
                      }
                      onClick={() =>
                        handleFilterChange("thickness_cm__gte", thickness)
                      }
                      style={{
                        color: "#000 !important",
                      }}
                    >
                      {thickness}cm
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div> */}
          <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "category"}
              onChange={handleAccordionChange("category")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("categories")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {filterOptions.categories
                    .filter(
                      (category) =>
                        !/^kuzhina$/i.test(category) &&
                        !/^kuzhine$/i.test(category)
                    )
                    .map((category) => (
                      <button
                        type="button"
                        key={category}
                        className={
                          filters.category === category ? "active" : ""
                        }
                        onClick={() => handleFilterChange("category", category)}
                        style={{
                          color: "#000 !important",
                        }}
                      >
                        {category}
                      </button>
                    ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="filter-inner">
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "dimensions"}
              onChange={handleAccordionChange("dimensions")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("dimensions")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {filterOptions.dimensions.map((dimensions) => (
                    <button
                      type="button"
                      key={dimensions}
                      className={
                        filters.dimensions === dimensions ? "active" : ""
                      }
                      onClick={() =>
                        handleFilterChange("dimensions", dimensions)
                      }
                      style={{
                        color: "#000 !important",
                      }}
                    >
                      {dimensions} cm
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="filter-inner" style={{ borderBottom: "none" }}>
            <Accordion
              sx={{
                boxShadow: "none",
                width: "100%",
                backgroundColor: "var(--bck-color)",
              }}
              expanded={expanded === "brand"}
              onChange={handleAccordionChange("brand")}
            >
              <AccordionSummary
                expandIcon={
                  <button className="expand-icon">
                    <img src="/assets/images/icons/expand.png" alt="" />
                  </button>
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                  {t("brands")}:
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="content">
                  {filterOptions.brand
                    .filter((brand) => !/^brand$/i.test(brand))
                    .map((brand) => (
                      <button
                        type="button"
                        key={brand}
                        className={filters.brand === brand ? "active" : ""}
                        onClick={() => handleFilterChange("brand", brand)}
                        style={{
                          color: "#000 !important",
                        }}
                      >
                        {brand}
                      </button>
                    ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="filter-inner-btns" style={{ borderBottom: "none" }}>
            <button
              className="btns"
              type="button"
              onClick={() => {
                handleFilterChange("reset", true);
                toggleFilterVisibility();
              }}
              style={{
                backgroundColor: "var(--dark-color)",
                height: "50px",
                borderBottomRightRadius: "0px",
                color: "#000 !important",
              }}
            >
              {t("clearFilters")}
            </button>
            <button
              className="btns"
              style={{
                backgroundColor: "var(--primary-color)",
                height: "50px",
                borderBottomLeftRadius: "0px",
                color: "#000 !important",
              }}
              onClick={toggleFilterVisibility}
            >
              {t("filter")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MobileFilter;
