export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('no method: getRoot');
  }

  afterRender() {}

  destroy() {}
}
