export async function searchAdress(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return response.json();
}

export async function submitForm(data) {
  await fetch("", {
    method: "POST",
    body: data,
  });
}
