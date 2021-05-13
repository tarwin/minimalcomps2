export class Image extends Component {
  constructor(parent, x, y, url) {
    super(parent, x, y);
    this._url = url;

    this.createChildren();
    this.createStyle();
    this.createListeners();

    this.setSize(100, 100);
    this.load();
  }

  //////////////////////////////////
  // Core
  //////////////////////////////////
  
  createChildren() {
    this.image = document.createElement("img");
    this.image.setAttribute("class", "MinimalImage");
    this.shadowRoot.append(this.image);
  }

  createStyle() {
    const style = document.createElement("style");
    style.textContent = `
      .MinimalImage,
      .MinimalImageDisabled {
        ${Style.baseStyle}
        background-color: #eee;
        border-radius: 0;
        border: 1px solid #999;
      }
      .MinimalImageDisabled {
        ${Style.disabledStyle}
      }
    `;
    this.shadowRoot.append(style);
  }

  createListeners() {
    this.onLoad = this.onLoad.bind(this);
    this.image.addEventListener("load", this.onLoad);
  }

  //////////////////////////////////
  // Handlers
  //////////////////////////////////

  onLoad() {
    this.origWidth = this.image.width;
    this.origHeight = this.image.height;
    this.updateImageSize();
    this.image.style.opacity = "1";
  }

  //////////////////////////////////
  // General
  //////////////////////////////////

  load() {
    this.image.style.opacity = "0";
    this.image.setAttribute("src", this._url);
  }

  updateImageSize() {
    const aspectRatio = this.origWidth / this.origHeight;
    this.image.width = this.width;
    this.image.height = this.height = this.width / aspectRatio;
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
      this.image.setAttribute("class", "MinimalImage");
    } else {
      this.image.setAttribute("class", "MinimalImage MinimalImageDisabled");
    }
  }

  get height() {
    return this.image.height;
  }

  set height(height) {
    super.height = height;
  }

  get url() {
    return this._url;
  }

  set url(url) {
    this._url = url;
    this.load();
  }

  get width() {
    return super.width;
  }

  set width(width) {
    super.width = width;
    if (this.image.width) {
      this.updateImageSize();
    }
  }
}

customElements.define("minimal-image", Image);

