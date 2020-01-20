import { Layouts } from "../helpers";

export default {
  version: "1.0.1",
  updatedFromVersion: null,
  dragEnabled: true,
  hotKeysEnabled: true,
  hotKeyLabelsEnabled: true,
  // New in 1.0.1
  iconRadiusPercentage: 20,
  bookmarkLabelFontSizePx: 15,
  bookmarkBackgroundSizePx: 50,
  showAddNewPlaceholder: true,
  displayLabels: true,
  stats: {
    installedOn: null,
    extensionOpenedTimes: 0,
    joinedVersion: null
  },
  // TODO:
  pageSize: {
    width: "100%",
    height: "100%"
  },
  autoHideControls: false,
  faviconBackground: "#ffffff",
  layout: Layouts.x3y3,
  background: {
    value: "default.png",
    type: "image"
  }
};
