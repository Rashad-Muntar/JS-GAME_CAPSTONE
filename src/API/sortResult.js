const inputValidator = (field) => {
  const rex = /\d+|\w+/;
  return !!rex.exec(field.value);
};

const sortScore = (data) => data.sort((pl1, pl2) => pl2.score - pl1.score);

const eltBuilder = (name, attrs, ...children) => {
  const dom = document.createElement(name);

  Object.entries(attrs).forEach(([key, value]) => {
    dom.setAttribute(key, value);
  });

  [...children].forEach((child) => dom.appendChild(child));

  return dom;
};

export { inputValidator, sortScore, eltBuilder };