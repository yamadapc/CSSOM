import { parse } from "./parse";

/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
export class CSSStyleDeclaration extends Array {
  length: number;
  parentRule: null;
  private _importants: {};

  constructor() {
	super();

    this.length = 0;
    this.parentRule = null;

    // NON-STANDARD
    this._importants = {};
  }

  /**
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set.
   */
  getPropertyValue(name: string): string {
    return this[name] || "";
  }

  /**
   * @param {string} name
   * @param {string} value
   * @param {string} [priority=null] "important" or null
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
   */
  setProperty(name: string, value: string, priority: string | null) {
    if (this[name]) {
      // Property already exist. Overwrite it.
      const index = Array.prototype.indexOf.call(this, name);
      if (index < 0) {
        this[this.length] = name;
        this.length++;
      }
    } else {
      // New property.
      this[this.length] = name;
      this.length++;
    }
    this[name] = value + "";
    this._importants[name] = priority;
  }

  /**
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
   */
  removeProperty(name: string) {
    if (!(name in this)) {
      return "";
    }
    var index = Array.prototype.indexOf.call(this, name);
    if (index < 0) {
      return "";
    }
    var prevValue = this[name];
    this[name] = "";

    // That's what WebKit and Opera do
    Array.prototype.splice.call(this, index, 1);

    // That's what Firefox does
    //this[index] = ""

    return prevValue;
  }

  getPropertyCSSValue() {
    //FIXME
  }

  /**
   * @param {String} name
   */
  getPropertyPriority(name: string): string {
    return this._importants[name] || "";
  }

  /**
   *   element.style.overflow = "auto"
   *   element.style.getPropertyShorthand("overflow-x")
   *   -> "overflow"
   */
  getPropertyShorthand() {
    //FIXME
  }

  isPropertyImplicit() {
    //FIXME
  }

  // Doesn't work in IE < 9
  get cssText(): string {
    const properties: string[] = [];
    for (var i = 0, length = this.length; i < length; ++i) {
      const name = this[i];
      const value = this.getPropertyValue(name);
      let priority = this.getPropertyPriority(name);
      if (priority) {
        priority = " !" + priority;
      }
      properties[i] = name + ": " + value + priority + ";";
    }
    return properties.join(" ");
  }

  set cssText(text: string) {
    let i, name;
    for (i = this.length; i--; ) {
      name = this[i];
      this[name] = "";
    }
    Array.prototype.splice.call(this, 0, this.length);
    this._importants = {};

    var dummyRule = parse("#bogus{" + text + "}").cssRules[0].style;
    var length = dummyRule.length;
    for (i = 0; i < length; ++i) {
      name = dummyRule[i];
      this.setProperty(
        dummyRule[i],
        dummyRule.getPropertyValue(name),
        dummyRule.getPropertyPriority(name)
      );
    }
  }
}
