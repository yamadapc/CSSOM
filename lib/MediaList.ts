/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-medialist-interface
 */
export class MediaList extends Array {
  constructor() {
	super();
    this.length = 0;
  }

  /**
   * @return {string}
   */
  get mediaText(): string {
    return Array.prototype.join.call(this, ", ");
  }

  /**
   * @param {string} value
   */
  set mediaText(value: string) {
    var values = value.split(",");
    var length = (this.length = values.length);
    for (var i = 0; i < length; i++) {
      this[i] = values[i].trim();
    }
  }

  /**
   * @param {string} medium
   */
  appendMedium(medium: string) {
    if (Array.prototype.indexOf.call(this, medium) === -1) {
      this[this.length] = medium;
      this.length++;
    }
  }

  /**
   * @param {string} medium
   */
  deleteMedium(medium: string) {
    var index = Array.prototype.indexOf.call(this, medium);
    if (index !== -1) {
      Array.prototype.splice.call(this, index, 1);
    }
  }
}