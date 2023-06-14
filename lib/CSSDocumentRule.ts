import { CSSRule } from "./CSSRule";
import { MatcherList } from "./MatcherList";

/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
export class CSSDocumentRule extends CSSRule {
  type = 10;
  matcher: MatcherList;
  cssRules: CSSRule[];

  constructor() {
    super();
    this.matcher = new MatcherList();
    this.cssRules = [];
  }

  //FIXME
  //CSSOM.CSSDocumentRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
  //CSSOM.CSSDocumentRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

  get cssText(): string {
    var cssTexts = [];
    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText);
    }
    return (
      "@-moz-document " +
      this.matcher.matcherText +
      " {" +
      cssTexts.join("") +
      "}"
    );
  }
}
