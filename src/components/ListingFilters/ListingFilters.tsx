import styles from "./ListingFilters.module.scss";
import { observer } from "mobx-react";
import RegionFilter from "./RegionFilter/RegionFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import { useState } from "react";
import RegionFilterStore from "./RegionFilter/RegionFilterStore";
import MinMaxFilterStore from "../../stores/MinMaxFilterStore";
import AreaFilter from "./AreaFilter/AreaFilter";
import RoomCountFilter from "./RoomCountFilter/RoomCountFilter";
import RoomCountFilterStore from "./RoomCountFilter/RoomCountFilterStore";
import { Chip } from "@mui/material";
import { addUrlParam, getUrlParam, removeUrlParam } from "../../misc/utils";
import { Region } from "../../misc/types";

const ListingFilters = () => {
  const [regionFilterStore] = useState(new RegionFilterStore());
  const [priceFilterStore] = useState(new MinMaxFilterStore());
  const [areaFilterStore] = useState(new MinMaxFilterStore());
  const [roomCountFilterStore] = useState(new RoomCountFilterStore());

  return (
    <div className={styles.root}>
      <div className={styles.root__filters}>
        <RegionFilter regionFilterStore={regionFilterStore} />
        <PriceFilter minMaxFilterStore={priceFilterStore} />
        <AreaFilter minMaxFilterStore={areaFilterStore} />
        <RoomCountFilter roomCountFilterStore={roomCountFilterStore} />
      </div>
      <div className={styles.root__chipGroup}>
        <>
          {regionFilterStore.chosenRegions.map((region) => (
            <Chip
              key={region.id}
              variant="outlined"
              label={region.name}
              onDelete={() => {
                regionFilterStore.removeChosenRegion(region, true);
                regionFilterStore.removeChosenRegion(region, false);
                const urlRegions = getUrlParam("region") as Region[] | null;

                if (Array.isArray(urlRegions)) {
                  const filteredUrlRegions = urlRegions.filter((e) => e.id === region.id);
                  addUrlParam("region", filteredUrlRegions);
                }
              }}
            />
          ))}
          {isFinite(priceFilterStore.filterValue.max) && (
            <Chip
              variant="outlined"
              label={`${priceFilterStore.filterValue.min}₾ - ${priceFilterStore.filterValue.max}₾`}
              onDelete={() => {
                priceFilterStore.resetToDefault();
                removeUrlParam("price");
              }}
            />
          )}
          {isFinite(areaFilterStore.filterValue.max) && (
            <Chip
              variant="outlined"
              label={`${areaFilterStore.filterValue.min}მ² - ${areaFilterStore.filterValue.max}მ²`}
              onDelete={() => {
                areaFilterStore.resetToDefault();
                removeUrlParam("area");
              }}
            />
          )}
          {roomCountFilterStore.filterValue !== 0 && (
            <Chip
              variant="outlined"
              label={`${roomCountFilterStore.filterValue} საძინებელი`}
              onDelete={() => {
                roomCountFilterStore.setFilterValue(0);
                removeUrlParam("room");
              }}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default observer(ListingFilters);
