class State {
  constructor(defaultValue) {
    this.value = defaultValue;
  }
  getValue = () => this.value;
  onChange = (oldValue, newValue) => {};
  setValue = newValue => {
    let oldValue = this.value;
    this.value = newValue;
    this.onChange(oldValue, newValue);
  };
}

export default function createState(defaultValue) {
  return new State(defaultValue);
}