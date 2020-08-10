export default class LWW {

  constructor() {
    this.addSet = {};
    this.removeSet = {};
  }

  add(data) {
    if (data) {
      this.addSet[data] = Date.now();
    }
  };

  remove(data) {
    if (data) {
      this.removeSet[data] = Date.now();
    }
  };

  merge() {
    const result = [];
    for (let key in this.addSet) {
      if (!this.removeSet.hasOwnProperty(key) || (this.removeSet[key] <= this.addSet[key])) {
        result.push(key);
      }
    }

    return result;
  }

  lookup(key) {

    const data = this.addSet[key];
    if (!data) {
      return data;
    } else {
      if (this.removeSet.hasOwnProperty(key) || (this.removeSet[key] <= this.addSet[key])) {
        return data;
      }
    }

    return null;
  }
}