import { observer } from "mobx-react";
import FilterFrame from "../../FilterFrame/FilterFrame";
import styles from "./RoomCountFilter.module.scss";
import { useEffect } from "react";
import { addUrlParam, getUrlParam } from "../../../misc/utils";
import RoomCountFilterStore from "./RoomCountFilterStore";

interface RoomCountFilterProps {
  roomCountFilterStore: RoomCountFilterStore;
}

const RoomCountFilter = ({ roomCountFilterStore }: RoomCountFilterProps) => {
  useEffect(() => {
    const urlValue = getUrlParam("room");
    if (urlValue !== null) {
      roomCountFilterStore.setFilterValue(Number(urlValue));
      roomCountFilterStore.setTempFilterValue(Number(urlValue));
    }
  }, []);

  return (
    <FilterFrame
      setOpen={(newValue) => roomCountFilterStore.setFilterOpen(newValue)}
      title="საძინებლების რაოდენობა"
      buttonText={"საძინებლების რაოდენობა"}
      isOpen={roomCountFilterStore.filterOpen}
      onSubmit={() => {
        roomCountFilterStore.setFilterValue(roomCountFilterStore.tempFilterValue);
        addUrlParam("room", roomCountFilterStore.tempFilterValue);
      }}
    >
      <div className={styles.root}>
        {[1, 2, 3, 4].map((n) => (
          <button
            style={{ outline: roomCountFilterStore.tempFilterValue === n ? "2px solid springgreen" : "2px solid gray" }}
            key={n}
            onClick={() => roomCountFilterStore.setTempFilterValue(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </FilterFrame>
  );
};

export default observer(RoomCountFilter);
