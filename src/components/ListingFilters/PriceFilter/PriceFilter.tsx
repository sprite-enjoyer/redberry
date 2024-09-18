import { observer } from "mobx-react";
import FilterFrame from "../../FilterFrame/FilterFrame";
import styles from "./PriceFilter.module.scss";
import { TextField } from "@mui/material";
import MinMaxFilterStore from "../../../stores/MinMaxFilterStore";
import { addUrlParam, getUrlParam } from "../../../misc/utils";
import { useEffect } from "react";
import { MinMaxFilterType } from "../../../misc/types";

interface PriceFilterProps {
  minMaxFilterStore: MinMaxFilterStore;
}

const PriceFilter = ({ minMaxFilterStore }: PriceFilterProps) => {
  useEffect(() => {
    const priceUrlParamValue = getUrlParam("price");
    if (priceUrlParamValue !== null) {
      minMaxFilterStore.setTempFilterValue(priceUrlParamValue as MinMaxFilterType);
      minMaxFilterStore.setFilterValue(priceUrlParamValue as MinMaxFilterType);
    }
  }, []);

  return (
    <FilterFrame
      setOpen={(newValue) => minMaxFilterStore.setFilterOpen(newValue)}
      title="ფასის მიხედვით"
      buttonText={"საფასო კატეგორია"}
      isOpen={minMaxFilterStore.filterOpen}
      onSubmit={() => {
        minMaxFilterStore.applyFilter();
        addUrlParam("price", minMaxFilterStore.filterValue);
      }}
    >
      <div className={styles.root}>
        <div className={styles.root__inputs}>
          <TextField
            value={minMaxFilterStore.tempFilterValue.min}
            type="number"
            placeholder="დან"
            slotProps={{ input: { endAdornment: "₾" } }}
            size="small"
          />
          <TextField
            value={minMaxFilterStore.tempFilterValue.max}
            type="number"
            placeholder="მდე"
            slotProps={{ input: { endAdornment: "₾" } }}
            size="small"
          />
        </div>
        <div className={styles.root__priceListContainer}>
          <div className={styles.root__priceListContainer__titles}>
            <span className={styles.root__priceListContainer__titles__title}>მინ. ფასი</span>
            <span className={styles.root__priceListContainer__titles__title}>მაქს. ფასი</span>
          </div>
          {[0, 50000, 100000, 150000, 200000].map((val) => (
            <div
              key={val}
              className={styles.root__priceListContainer__prices}
              onClick={() => minMaxFilterStore.setTempFilterValue({ min: val, max: val + 50000 })}
            >
              <span>{val} ₾</span>
              <span className={styles.root__priceListContainer__prices__right}>{val + 50000} ₾</span>
            </div>
          ))}
        </div>
      </div>
    </FilterFrame>
  );
};

export default observer(PriceFilter);
