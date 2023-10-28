let currentStep = 0;
const form = document.querySelector("form");
const formSteps = form.querySelectorAll(".form-step");
const buttons = document.querySelectorAll("form button");

const formMethods = {
  checkValues() {
    const inputs = Array.from(form.querySelectorAll(".form-step.active input"));
    return inputs.every((input) => input.reportValidity());
  },
  updateActiveStep() {
    formSteps.forEach((step) => step.classList.remove("active"));
    return formSteps[currentStep].classList.toggle("active");
  },
  sendForm() {
    return alert("enviado");
  },
};

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const actions = {
      next() {
        if (!formMethods.checkValues()) return;
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

    const allInputs = Array.from(form.querySelectorAll("input"));

    const action = event.target.dataset.action;
    if (action !== "send") return actions[action]();
    else {
      const allIsFilled = allInputs.every((input) => input.value.trim() !== "");
      if (allIsFilled) return actions[action]();
    }
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
