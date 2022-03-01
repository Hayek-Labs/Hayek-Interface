const isString = (mix: string | number | object): mix is string => {
  return typeof mix === 'string';
};

const isNumber = (mix: string | number | object): mix is number => {
  return typeof mix === 'number';
};

const isObject = (mix: string | number | object): mix is object => {
  return typeof mix === 'object';
};

function toVal(mix: any) {
  var k,
    y,
    str = '';
  if (isString(mix) || isNumber(mix)) {
    str += mix;
  } else if (isObject(mix)) {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if ((mix as any)[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }
  return str;
}

function clsx_m(..._: any[]) {
  var i = 0,
    tmp,
    x,
    str = '';
  while (i < arguments.length) {
    if ((tmp = arguments[i++])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  return str;
}

export default clsx_m;
