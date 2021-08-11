import { configure } from "mobx";
import FipeStore from "./FipeStore";
import UIStore from "./UIStore";

export default class RootStore {
  constructor() {
    configure({ enforceActions: "always" });
    this.uiStore = new UIStore();
    this.fipeStore = new FipeStore(null, this.uiStore);
  }
}
