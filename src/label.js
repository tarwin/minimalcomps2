export class Label extends Component {
  constructor(parent, x, y, text) {
    super(parent, x, y);
    this._text = text;

    this.createChildren();
    this.createStyle();
  }

  //////////////////////////////////
  // Core
  //////////////////////////////////
  
  createChildren() {
    this._text = this._text;
    this.label = document.createElement("div");
    this.label.textContent = this._text;
    this.label.setAttribute("class", "MinimalLabel");
    this.shadowRoot.append(this.label);
  }

  createStyle() {
    const style = document.createElement("style");
    style.textContent = `
      .MinimalLabel {
        ${Style.baseStyle}
        white-space: nowrap;
        color: #333;
        user-select: none;
      }
      .MinimalLabelDisabled {
        ${Style.disabledStyle}
      }
    `;
    this.shadowRoot.append(style);
  }

  //////////////////////////////////
  // Getters/Setters
  // alphabetical. getter first.
  //////////////////////////////////
  
  get enabled() {
    return super.enabled;
  }

  set enabled(enabled) {
    super.enabled = enabled;
    if (this.enabled) {
      this.label.setAttribute("class", "MinimalLabel");
    } else {
      this.label.setAttribute("class", "MinimalLabel MinimalLabelDisabled");
    }
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
    this.label.textContent = text;
  }

  get width() {
    return this.label.offsetWidth;
  }
}

customElements.define("minimal-label", Label);