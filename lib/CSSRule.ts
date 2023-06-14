export abstract class CSSRule {
  parentRule: CSSRule | null;
  parentStyleSheet: null;
  abstract get cssText(): string;

  constructor() {
    this.parentRule = null;
    this.parentStyleSheet = null;
  }

  static UNKNOWN_RULE = 0; // obsolete
  static STYLE_RULE = 1;
  static CHARSET_RULE = 2; // obsolete
  static IMPORT_RULE = 3;
  static MEDIA_RULE = 4;
  static FONT_FACE_RULE = 5;
  static PAGE_RULE = 6;
  static KEYFRAMES_RULE = 7;
  static KEYFRAME_RULE = 8;
  static MARGIN_RULE = 9;
  static NAMESPACE_RULE = 10;
  static COUNTER_STYLE_RULE = 11;
  static SUPPORTS_RULE = 12;
  static DOCUMENT_RULE = 13;
  static FONT_FEATURE_VALUES_RULE = 14;
  static VIEWPORT_RULE = 15;
  static REGION_STYLE_RULE = 16;
}