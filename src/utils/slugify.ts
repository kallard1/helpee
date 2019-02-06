class Slugify {
  public static replace(string: String) {
    string = string.toLocaleLowerCase();
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    string = string.replace(/[^a-z0-9]+/ig, "-");

    return string;
  }
}

export default Slugify;
