let currentStep = 0;
const form = document.querySelector("form");
const formSteps = form.querySelectorAll(".form-step");

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

form.addEventListener("click", (event) => {
  if (!event.target.matches("[data-action")) {
    return;
  }

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
  };

  const allInputs = form.querySelectorAll("input");
  const allIsFilled = allInputs.every((input) => input.value.trim() !== "");

  if (currentStep == 1 && allIsFilled) return formMethods.sendForm();

  const action = event.target.dataset.action;
  actions[action]();
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
