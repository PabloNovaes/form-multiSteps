import { success, error } from './sweet.js'
let currentStep = 0;
const form = document.querySelector("form");
const formSteps = form.querySelectorAll(".form-step");
const buttons = document.querySelectorAll("form button");

const formMethods = {
  checkValues() {
    const inputs = Array.from(form.querySelectorAll(".form-step input"));
    return inputs.every(input => {
      return input.value !== ""
    });
  },
  checkStepValues(){
    const inputs = Array.from(form.querySelectorAll(".form-step.active input"));
     return inputs.every(input => {
       return input.value !== ""
     });
  },
  updateActiveStep() {
    formSteps.forEach((step) => step.classList.remove("active"));
    return formSteps[currentStep].classList.toggle("active");
  },
  sendForm() {
    if (!formMethods.checkValues()) {
      return error("Preencha todos os campos")

    }
    return success("enviado");
  },
};

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const actions = {
      next() {
        if(!formMethods.checkStepValues()){
          return error("Preencha todos os campos")
        }
          currentStep++;
          formMethods.updateActiveStep();
      },
      prev() {
        currentStep--;
        formMethods.updateActiveStep();
      },
      send() {
        formMethods.sendForm();
      },
    };

    const action = event.target.dataset.action;
    actions[action]();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

formSteps.forEach((step) => {
  function addHide() {
    step.classList.add("hide");
  }
  step.addEventListener("animationend", () => {
    addHide();
    formSteps[currentStep].classList.remove("hide");
  });
});
