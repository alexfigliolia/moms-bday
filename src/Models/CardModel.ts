import { BaseModel } from "./BaseModel";
import type { ICards } from "./types";

export class CardModel extends BaseModel<ICards> {
  constructor() {
    super("Cards", { index: 0 });
  }

  public setActive(index: number) {
    this.priorityUpdate(state => {
      state.index = index;
    });
  }
}
