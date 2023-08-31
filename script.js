function validation() {
  const form = document.querySelector('form');
  const name = document.querySelector('#cardholder-name');
  const number = document.querySelector('#card-number');
  const monthMM = document.querySelector('#exp-month');
  const yearYY = document.querySelector('#exp-year');
  const cvc = document.querySelector('#cvc');
  const btn = document.querySelector('button');
  const completed = document.querySelector('.completed');
  const contBtn = document.querySelector('.continue');
  name.addEventListener('keyup', validateName);
  number.addEventListener('keyup', validateNumber);
  monthMM.addEventListener('keyup', validateMM);
  yearYY.addEventListener('keyup', validateYY);
  cvc.addEventListener('keyup', validateCVC);
  btn.addEventListener('click', accept);
  contBtn.addEventListener('click', activeStates);

  function validateName(event) {
    const nameProfile = document.querySelector('#name');
    const inputValue = event.target.value;
    const error = document.querySelector('.errorName');
    // Limitando a quantidade de caracteres
    const maxLength = 30; // Defina o limite máximo de caracteres
    if (inputValue.length > maxLength) {
      name.value = inputValue.substring(0, maxLength); // Trunca o valor para o limite
    }

    // Validando o nome do cartão com REGEXP
    const cardNameRegex = /^[A-Za-z\s]+$/; // Expressão regular para aceitar apenas letras e espaços
    if (cardNameRegex.test(inputValue)) {
      nameProfile.innerText = inputValue;
      this.classList.remove('error');
      error.innerText = '';
    } else {
      nameProfile.innerText = 'INVALID NAME';
      this.classList.add('error');
      error.innerText = 'INVALID NAME';
    }
  }

  function validateNumber(event) {
    const numberCard = document.querySelector('#number');
    const inputValue = event.target.value;
    const error = document.querySelector('.errorNumber');

    // Remover todos os caracteres não numéricos
    const sanitizedInput = inputValue.replace(/\D/g, '');

    // Formatar o número no estilo "0000 0000 0000 0000"
    const formattedNumber = sanitizedInput.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Limitar o número máximo de caracteres (incluindo espaços)
    const maxLength = 19; // "0000 0000 0000 0000"
    if (formattedNumber.length > maxLength) {
      numberCard.value = formattedNumber.substring(0, maxLength); // Trunca o valor para o limite
    }

    const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/; // Expressão regular para o formato "0000 0000 0000 0000"
    if (cardNumberRegex.test(formattedNumber)) {
      // Resto do código para remover 'error' e atualizar o erro
      numberCard.innerText = formattedNumber;
      error.innerText = '';
      this.classList.remove('error');
    } else {
      // Resto do código para adicionar 'error' e mostrar mensagem de erro
      numberCard.innerText = 'INVALID NUMBER';
      error.innerText = 'INVALID NUMBER';
      this.classList.add('error');
    }
  }

  function validateMM(event) {
    const mm = document.querySelector('#month-MM');
    const inputValue = event.target.value.trim(); // Remove espaços em branco no início e no fim
    const errorMM = document.querySelector('.errorMM');

    const isValidMonth = /^(0?[1-9]|1[0-2])$/.test(inputValue);

    if (!isValidMonth) {
      mm.innerText = 'INVALID';
      this.classList.add('error');
      errorMM.innerText = 'INVALID MONTH';
    } else {
      mm.innerText = inputValue;
      this.classList.remove('error');
      errorMM.innerText = '';
    }
  }
  function validateYY(event) {
    const yy = document.querySelector('#year-YY');
    const inputValue = event.target.value.trim();
    const errorYY = document.querySelector('.errorYY');
    const currentYear = new Date().getFullYear(); // Obtém o ano atual
    const maxLength = 2; // Definindo o máximo de caracteres para o ano

    const isValidYear = /^(0[0-9]|1[0-9]|2[0-9])$/.test(inputValue); // Validação do ano de 00 a 29

    if (!isValidYear) {
      yy.innerText = 'INVALID';
      this.classList.add('error');
      errorYY.innerText = 'Invalid year';
    } else {
      const fullYear = currentYear.toString().substr(0, 2) + inputValue; // Monta o ano completo
      yy.innerText = fullYear;
      this.classList.remove('error');
      errorYY.innerText = '';
    }
  }
  function validateCVC(event) {
    const cvcNumber = document.querySelector('#cvc-number');
    const inputValue = event.target.value.trim();
    const errorCVC = document.querySelector('.errorCVC');
    const maxLength = 3; // Definindo o máximo de caracteres para o CVC

    const isValidCVC = /^[0-9]{3}$/.test(inputValue); // Validação do CVC com 3 dígitos numéricos

    if (!isValidCVC) {
      cvcNumber.innerText = 'INVALID';
      this.classList.add('error');
      errorCVC.innerText = 'Invalid CVC';
    } else {
      cvcNumber.innerText = inputValue;
      this.classList.remove('error');
      errorCVC.innerText = '';
    }
  }
  function accept(event) {
    event.preventDefault();
    const nameValue = String(document.forms.dados.elements[0].value);
    const numberValue = String(document.forms.dados.elements[1].value);
    const monthValue = String(document.forms.dados.elements[2].value);
    const yearValue = String(document.forms.dados.elements[3].value);
    const cvcValue = String(document.forms.dados.elements[4].value);
    if (
      nameValue.length === 0 ||
      numberValue === 0 ||
      monthValue === 0 ||
      yearValue === 0 ||
      cvcValue === 0
    ) {
      name.classList.add('error');
      number.classList.add('error');
      monthMM.classList.add('error');
      yearYY.classList.add('error');
      cvc.classList.add('error');
    } else {
      form.classList.add('ativo');
      completed.classList.add('ativo');
    }
  }
  function activeStates() {
    form.classList.remove('ativo');
    completed.classList.remove('ativo');
  }
}

validation();
