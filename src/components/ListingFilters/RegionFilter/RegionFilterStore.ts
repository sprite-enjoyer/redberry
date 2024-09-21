import { action, makeObservable, observable } from "mobx";
import { Region } from "../../../misc/types";
import axios from "axios";

class RegionFilterStore {
  regions: Region[] = [];
  chosenRegions: Region[] = [];
  temoporaryChosenRegions: Region[] = [];
  filterOpen = false;

  constructor() {
    makeObservable(this, {
      regions: observable,
      temoporaryChosenRegions: observable,
      filterOpen: observable,
      chosenRegions: observable,
      setRegions: action,
      addChosenRegion: action,
      removeChosenRegion: action,
      applyRegionFilter: action,
      setChosenRegions: action,
      setTemporaryChosenRegions: action,
      setFilterOpen: action,
    });
  }

  setFilterOpen(newValue: boolean) {
    this.filterOpen = newValue;
  }

  setRegions(newValue: Region[]) {
    this.regions = newValue;
  }

  setChosenRegions(newValue: Region[]) {
    this.chosenRegions = newValue;
  }

  setTemporaryChosenRegions(newValue: Region[]) {
    this.temoporaryChosenRegions = newValue;
  }

  addChosenRegion(newValue: Region, temporary: boolean) {
    temporary ? this.temoporaryChosenRegions.push(newValue) : this.chosenRegions.push(newValue);
  }

  removeChosenRegion(element: Region, temporary: boolean) {
    if (temporary) {
      this.temoporaryChosenRegions = this.temoporaryChosenRegions.filter((e) => e.id !== element.id);
      return;
    }
    this.chosenRegions = this.chosenRegions.filter((e) => e.id !== element.id);
  }

  applyRegionFilter() {
    this.chosenRegions = this.temoporaryChosenRegions;
  }

  async fetchRegions() {
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}/regions`)
      .then((res) => this.setRegions(res.data))
      .catch((e) => console.error(e));
  }
}

export default RegionFilterStore;
