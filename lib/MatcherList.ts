/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
export class MatcherList extends Array {
  constructor() {
    super();
    this.length = 0;
  }

  /**
   * @return {string}
   */
  get matcherText(): string {
    return Array.prototype.join.call(this, ", ");
  }

  /**
   * @param {string} value
   */
  set matcherText(value: string) {
    // just a temporary solution, actually it may be wrong by just split the value with ',', because a url can include ','.
    const values = value.split(",");
    const length = (this.length = values.length);
    for (var i = 0; i < length; i++) {
      this[i] = values[i].trim();
    }
  }

  /**
   * @param {string} matcher
   */
  appendMatcher(matcher: string) {
    if (Array.prototype.indexOf.call(this, matcher) === -1) {
      this[this.length] = matcher;
      this.length++;
    }
  }

  /**
   * @param {string} matcher
   */
  deleteMatcher(matcher: string) {
    var index = Array.prototype.indexOf.call(this, matcher);
    if (index !== -1) {
      Array.prototype.splice.call(this, index, 1);
    }
  }
}