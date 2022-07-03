import { IExpanse, IUser } from "../Interfaces/apiInterfaces";

const BASE_URL = "http://localhost:3001";

export function getExpanses(month: string): Promise<IExpanse[]> {
  return fetch(`${BASE_URL}/despesas?mes=${month}&_sort=dia`, {
    credentials: "include",
  }).then(handleResponse);
}

export function getUserEndpoint(): Promise<IUser> {
  return fetch(`${BASE_URL}/sessao/usuario`, { credentials: "include" }).then(
    handleResponse
  );
}

export function signInEndpoint(email: string, senha: string): Promise<IUser> {
  return fetch(`${BASE_URL}/sessao/criar`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponse);
}

export function signOutEndpoint(): Promise<IUser> {
  return fetch(`${BASE_URL}/sessao/finalizar`, {
    method: "POST",
    credentials: "include",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
