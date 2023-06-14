export class CSSValue {
  // @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
  set cssText(text: string) {
    const name = this.constructor.name;

    throw new Error(
      'DOMException: property "cssText" of "' +
        name +
        '" is readonly and can not be replaced with "' +
        text +
        '"!'
    );
  }

  get cssText(): string {
    const name = this.constructor.name;
    throw new Error('getter "cssText" of "' + name + '" is not implemented!');
  }
}
