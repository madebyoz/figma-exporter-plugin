export interface UISelectOption {
  label: string;
  value: string;
}

export interface UIState {
  loading: boolean;
  convention: string;
}

export interface ExportableBytes {
  name: string;
  setting: ExportSettingsImage | ExportSettingsPDF | ExportSettingsSVG;
  bytes: Uint8Array;
  blobType: string;
  extension: string;
}
