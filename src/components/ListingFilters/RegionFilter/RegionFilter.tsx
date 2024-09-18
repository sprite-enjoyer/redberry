import styles from "./RegionFilter.module.scss";
import { observer } from "mobx-react";
import { useEffect } from "react";
import RegionFilterStore from "./RegionFilterStore";
import { addUrlParam, getUrlParam, includesValue } from "../../../misc/utils";
import { Region } from "../../../misc/types";
import FilterFrame from "../../FilterFrame/FilterFrame";

interface RegionFilterProps {
  regionFilterStore: RegionFilterStore;
}

const RegionFilter = ({ regionFilterStore }: RegionFilterProps) => {
  useEffect(() => {
    regionFilterStore.fetchRegions();
    const region = getUrlParam("region");
    if (region !== null) {
      regionFilterStore.setChosenRegions(region as Region[]);
      regionFilterStore.setTemporaryChosenRegions(region as Region[]);
    }
  }, []);

  return (
    <FilterFrame
      setOpen={(newValue) => regionFilterStore.setFilterOpen(newValue)}
      title="რეგიონის მიხედვით"
      buttonText={"რეგიონი"}
      isOpen={regionFilterStore.filterOpen}
      onSubmit={() => {
        regionFilterStore.applyRegionFilter();
        addUrlParam("region", regionFilterStore.chosenRegions);
      }}
    >
      <div className={styles.root__region}>
        {regionFilterStore.regions.map((region) => (
          <div key={region.id} className={styles.root__region__option}>
            <input
              checked={includesValue<Region>(regionFilterStore.temoporaryChosenRegions, region)}
              className={styles.root__region__option__checkbox}
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) regionFilterStore.addChosenRegion(region, true);
                else regionFilterStore.removeChosenRegion(region, true);
              }}
            />
            <span className={styles.root__region__option__text}>{region.name}</span>
          </div>
        ))}
      </div>
    </FilterFrame>
  );
};

export default observer(RegionFilter);
