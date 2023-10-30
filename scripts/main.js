import { success, error } from './sweet.js'
import { searchAdress } from './api.js'

let currentStep = 0;
const form = document.querySelector("form");
const formSteps = form.querySelectorAll(".form-step");
const buttons = document.querySelectorAll("form button");
const cepInput = document.querySelector("#cep")

const formMethods = {
  checkValues() {
    const inputs = Array.from(form.querySelectorAll(".form-step input"));
    return inputs.every(input => {
      return input.value !== ""
    });
  },
  checkStepValues() {
    const inputs = Array.from(form.querySelectorAll(".form-step.active input"));
    return inputs.every(input => {
      return input.value !== ""
    });
  },
  updateActiveStep() {
    formSteps.forEach((step) => step.classList.remove("active"));
    return formSteps[currentStep].classList.toggle("active");
  },
  async autoCompleteAdress(cep) {
    const data = await searchAdress(cep)
return data
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
        if (!formMethods.checkStepValues()) {
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

cepInput.addEventListener("keyup", async()=>{
  const value = cepInput.value
  if(value.length < 8) return
const data = await formMethods.autoCompleteAdress(value)
   const {logradouro, bairro, localidade} = data
   document.querySelector("input[name=rua]").value = logradouro
   document.querySelector("input[name=bairro]").value = bairro 
   // document.querySelector("input[name=rua]").value = 
})
