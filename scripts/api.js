export async function searchAdress(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
return   response.json()
}