import GenericFilterStore from "../../../stores/GenericFilterStore";

class RoomCountFilterStore extends GenericFilterStore<number> {
  constructor() {
    super(0, 0);
  }
}

export default RoomCountFilterStore;
