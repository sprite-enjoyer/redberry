import { action, makeObservable, override } from "mobx";
import GenericFilterStore from "./GenericFilterStore";
import { MinMaxFilterType } from "../misc/types";

class MinMaxFilterStore extends GenericFilterStore<MinMaxFilterType> {
  constructor() {
    super({ min: 0, max: Number.POSITIVE_INFINITY }, { min: 0, max: 0 });

    makeObservable(this, {
      setMax: action,
      setMin: action,
      setTempMax: action,
      setTempMin: action,
      applyFilter: override,
      resetToDefault: action,
    });
  }

  setMin(newValue: number) {
    this.filterValue.min = newValue;
  }

  setMax(newValue: number) {
    this.filterValue.max = newValue;
  }

  setTempMin(newValue: number) {
    this.tempFilterValue.min = newValue;
  }

  setTempMax(newValue: number) {
    this.tempFilterValue.max = newValue;
  }

  applyFilter() {
    if (this.tempFilterValue.min > this.tempFilterValue.max) return;
    this.filterValue = this.tempFilterValue;
  }

  resetToDefault() {
    this.filterValue = { min: 0, max: Number.POSITIVE_INFINITY };
    this.tempFilterValue = { min: 0, max: Number.POSITIVE_INFINITY };
  }
}

export default MinMaxFilterStore;
