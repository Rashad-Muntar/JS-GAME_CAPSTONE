import scoreAPI from './api';

const Dom = (() => {
  const nameform = () => {
    const form = document.createElement('div');
    const p = document.createElement('p');
    form.setAttribute('id', 'form');
    form.className = 'form-group text-center';
    form.style.position = 'absolute';
    form.style.top = '280px';
    form.style.left = '280px';
    form.innerHTML = `
        <input class="form-control" type="search" id="input" placeholder="Enter your name" aria-label="Search" required/></br>
        <button class="form-control btn btn-secondary btn-block" type="submit" id="submit"> Submit Score</button>
      `;
    form.appendChild(p);
    const body = document.body.appendChild(form);
    return body;
  };

  const submitButtonAction = (score) => {
    const input = document.querySelector('#input');
    const form = document.querySelector('#form');
    const button = document.querySelector('#submit');
    const p = document.querySelector('p');
    setTimeout(() => {
      button.onclick = () => {
        if (input.value !== '') {
          form.innerHTML = '<h3 id="submitting">Posting... </h3>';
          scoreAPI.submit(input.value, score).then((response) => {
            form.innerHTML = `<h3 id="response">${response.result} </h3>`;
          });
        } else {
          p.innerHTML = 'Enter a valid name';
        }
      };
    }, 1000);
  };

  const removeDomElements = () => {
    const form = document.querySelector('#form');
    form.parentNode.removeChild(form);
  };

  return {
    nameform,
    submitButtonAction,
    removeDomElements,
  };
})();

export default Dom;