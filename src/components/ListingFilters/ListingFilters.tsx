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

const ListingFilters = () => {
  const [regionFilterStore] = useState(new RegionFilterStore());
  const [priceFilterStore] = useState(new MinMaxFilterStore());
  const [areaFilterStore] = useState(new MinMaxFilterStore());
  const [roomCountFilterStore] = useState(new RoomCountFilterStore());

  return (
    <div className={styles.root}>
      <RegionFilter regionFilterStore={regionFilterStore} />
      <PriceFilter minMaxFilterStore={priceFilterStore} />
      <AreaFilter minMaxFilterStore={areaFilterStore} />
      <RoomCountFilter roomCountFilterStore={roomCountFilterStore} />
    </div>
  );
};

export default observer(ListingFilters);
