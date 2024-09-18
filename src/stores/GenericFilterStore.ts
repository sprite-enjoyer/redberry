import { action, makeObservable, observable } from "mobx";

class GenericFilterStore<T> {
  filterValue: T;
  tempFilterValue: T;
  filterOpen = false;

  constructor(initialValue: T, initialTempValue: T) {
    this.filterValue = initialValue;
    this.tempFilterValue = initialTempValue;
    makeObservable(this, {
      filterValue: observable,
      filterOpen: observable,
      tempFilterValue: observable,
      setFilterValue: action,
      setTempFilterValue: action,
      applyFilter: action,
      setFilterOpen: action,
    });
  }

  setFilterOpen(newValue: boolean) {
    this.filterOpen = newValue;
  }

  setFilterValue(newValue: T) {
    this.filterValue = newValue;
  }

  setTempFilterValue(newValue: T) {
    this.tempFilterValue = newValue;
  }

  applyFilter() {
    this.filterValue = this.tempFilterValue;
  }
}

export default GenericFilterStore;
