import { observer } from "mobx-react";
import FilterFrame from "../../FilterFrame/FilterFrame";
import styles from "./AreaFilter.module.scss";
import { TextField } from "@mui/material";
import MinMaxFilterStore from "../../../stores/MinMaxFilterStore";
import { addUrlParam, getUrlParam } from "../../../misc/utils";
import { useEffect } from "react";
import { MinMaxFilterType } from "../../../misc/types";
import { toJS } from "mobx";

interface AreaFilterProps {
  minMaxFilterStore: MinMaxFilterStore;
}

const AreaFilter = ({ minMaxFilterStore }: AreaFilterProps) => {
  useEffect(() => {
    const areaUrlParam = getUrlParam("area");
    if (areaUrlParam !== null) {
      minMaxFilterStore.setTempFilterValue(areaUrlParam as MinMaxFilterType);
      minMaxFilterStore.setFilterValue(areaUrlParam as MinMaxFilterType);
    }
  }, []);

  return (
    <FilterFrame
      setOpen={(newValue) => minMaxFilterStore.setFilterOpen(newValue)}
      title="ფართობის მიხედვით"
      buttonText={"ფართობი"}
      isOpen={minMaxFilterStore.filterOpen}
      onSubmit={() => {
        minMaxFilterStore.applyFilter();
        addUrlParam("area", minMaxFilterStore.filterValue);
      }}
    >
      <div className={styles.root}>
        <div className={styles.root__inputs}>
          <TextField
            value={minMaxFilterStore.tempFilterValue.min}
            type="number"
            placeholder="დან"
            slotProps={{ input: { endAdornment: "მ²" } }}
            size="small"
            onChange={(e) => minMaxFilterStore.setTempMin(Number(e.target.value))}
          />
          <TextField
            value={minMaxFilterStore.tempFilterValue.max}
            type="number"
            placeholder="მდე"
            slotProps={{ input: { endAdornment: "მ²" } }}
            size="small"
            onChange={(e) => minMaxFilterStore.setTempMax(Number(e.target.value))}
          />
        </div>
        <div className={styles.root__priceListContainer}>
          <div className={styles.root__priceListContainer__titles}>
            <span className={styles.root__priceListContainer__titles__title}>მინ. ფასი</span>
            <span className={styles.root__priceListContainer__titles__title}>მაქს. ფასი</span>
          </div>
          {[0, 50, 100, 150, 200].map((val) => (
            <div
              key={val}
              className={styles.root__priceListContainer__prices}
              onClick={() => minMaxFilterStore.setTempFilterValue({ min: val, max: val + 50 })}
            >
              <span>{val} მ²</span>
              <span className={styles.root__priceListContainer__prices__right}>{val + 50} მ²</span>
            </div>
          ))}
        </div>
      </div>
    </FilterFrame>
  );
};

export default observer(AreaFilter);
