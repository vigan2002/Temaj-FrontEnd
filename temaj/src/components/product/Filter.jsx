import React, { useCallback, useMemo } from "react";
import "./style.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

const Filter = ({
  filters,
  handleFilterChange,
  handlePriceChange,
  priceRange,
  filterOptions,
  resetFilters,
}) => {
  const { t } = useTranslation();
  const isSmallDev = useMediaQuery("(max-width: 768px)");

  const debouncedHandlePriceChange = useCallback(
    debounce((event, newValue) => {
      handlePriceChange(event, newValue);
    }, 300),
    [handlePriceChange]
  );

  const filterContent = useMemo(() => {
    return [
      {
        title: `${t("kind")}`,
        content: [`${t("pllake")}`, `${t("sanitary")}`].map((kind) => (
          <button
            type="button"
            key={kind}
            className={filters.kind === kind ? "active" : ""}
            onClick={() => handleFilterChange("kind", kind)}
          >
            {kind}
          </button>
        )),
      },
      {
        title: `${t("price")}`,
        content: (
          <>
            <div className="price-content">
              <button>{priceRange[0]}</button>-
              <button>{priceRange[1]}</button>
            </div>
            <Slider
              getAriaLabel={() => "price range"}
              value={priceRange}
              onChange={debouncedHandlePriceChange}
              defaultValue={[20, 30]}
              step={1}
              min={Math.min(...filterOptions.price)}
              max={Math.max(...filterOptions.price)}
              color="var(--primary-color)"
              sx={{ color: "var(--primary-color)", mt: "10px" }}
            />
          </>
        ),
      },
      {
        title: `${t("finish")}`,
        content: filterOptions.finish.map((finish) => (
          <button
            type="button"
            key={finish}
            className={filters.finish === finish ? "active" : ""}
            onClick={() => handleFilterChange("finish", finish)}
          >
            {finish}
          </button>
        )),
      },
      {
        title: `${t("color")}`,
        content: filterOptions.colors.map((color) => (
          <button
            type="button"
            key={color}
            className={filters.color === color ? "active" : ""}
            onClick={() => handleFilterChange("color", color)}
          >
            {color}
          </button>
        )),
      },
      // {
      //   title: `${t("thickness")}`,
      //   content: filterOptions.thickness_cm.map((thickness) => (
      //     <button
      //       type="button"
      //       key={thickness}
      //       className={
      //         filters.thickness_cm__gte === thickness ? "active" : ""
      //       }
      //       onClick={() => handleFilterChange("thickness_cm__gte", thickness)}
      //     >
      //       {thickness}cm
      //     </button>
      //   )),
      // },
      {
        title: `${t("categories")}`,
        content: filterOptions.categories
        .filter(
          (category) => !/^kuzhina$/i.test(category) && !/^kuzhine$/i.test(category)
        )
        .map((category) => (
          <button
            type="button"
            key={category}
            className={filters.category === category ? "active" : ""}
            onClick={() => handleFilterChange("category", category)}
          >
            {category}
          </button>
        )),
      },
      {
        title: `${t("subceffect")}`,
        content: [`${t("beton")}`, `${t("mermer")}`, `${t("dimensionXXL")}`, `${t("smallDimensions")}`].map((subceffect) => (
          <button
            type="button"
            key={subceffect}
            className={filters.subceffect === subceffect ? "active" : ""}
            onClick={() => handleFilterChange("subceffect", subceffect)}
          >
            {subceffect}
          </button>
        )),
      },
      {
        title: `${t("dimensions")}`,
        content: filterOptions.dimensions.map((dimension) => (
          <button
            type="button"
            key={dimension}
            //className={filters?.dimensions?.any(e=> dimension) ? "active" : ""}
            className={filters.dimensions === dimension ? "active" : ""}
            onClick={() => handleFilterChange("dimensions", dimension)}
          >
            {dimension} cm
          </button>
        )),
      },
      {
        title: `${t("brands")}`,
        content: filterOptions.brand
        .filter(
          (brand) => !/^brand$/i.test(brand)
        )
        .map((brand) => (
          <button
            type="button"
            key={brand}
            className={filters.brand === brand ? "active" : ""}
            onClick={() => handleFilterChange("brand", brand)}
          >
            {brand}
          </button>
        )),
      },
    ];
  }, [filters, filterOptions, handleFilterChange, priceRange, debouncedHandlePriceChange]);

  return (
    <div className="filter">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="filter-wrapper"
        style={{ display: isSmallDev ? "none" : "block" }}
      >
        <div className="filter-container">
          {filterContent.map((filter, index) => (
            <div className="filter-inner" key={index}>
              <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                <AccordionSummary
                  expandIcon={
                    <button className="expand-icon">
                      <img src="/assets/images/icons/expand.png" alt="" />
                    </button>
                  }
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <p style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}>
                    {filter.title}:
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="content">{filter.content}</div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
          <div className="filter-inner-btns" style={{ borderBottom: "none" }}>
            <button
              className="btns"
              type="button"
              onClick={resetFilters}
              style={{ fontSize: "18px", fontWeight: 400, color: "#000" }}
            >
              {t("clearFilters")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Filter);