const alphabetOnly = /^[a-zA-Z]+$/;
const numericOnly = /^[1-9]+[0-9]*$/;
const passwordvalidate= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

const cartStatus = {
  ADDED: 0,
  CHECKOUT: 1,
  CANCEL: -1,
  PROCESS:2,  
}

module.exports = {
  alphabetOnly,
  numericOnly,
  passwordvalidate,
  cartStatus
};
