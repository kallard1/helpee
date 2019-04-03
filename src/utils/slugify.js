class Slugify {

  /**
   * Slugify string
   * @param string
   */
  replace(string) {
    let value = string;
    value = value.toLowerCase();
    value = value.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    value = value.replace(/[^a-z0-9]+/ig, '-');

    return value;
  }
}

module.exports = Slugify;
