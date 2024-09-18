import GenericFilterStore from "../../../stores/GenericFilterStore";

class RoomCountFilterStore extends GenericFilterStore<number> {
  constructor() {
    super(1, 1);
  }
}

export default RoomCountFilterStore;
