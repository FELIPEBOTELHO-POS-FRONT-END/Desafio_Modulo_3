import { Box, Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { FormEvent, useState } from "react";
import { IUser } from "../Interfaces/apiInterfaces";
import { signInEndpoint } from "../Service/apiService";

interface ILoginPageProps {
  onSignIn: (user: IUser) => void;
}

export function LoginPage(props: ILoginPageProps) {
  const [email, setEmail] = useState("usuario@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(props.onSignIn, (e) => {
      setError("E-mail não encontrado ou senha incorreta");
    });
  }

  return (
    <Container maxWidth="sm">
      <h1>Desafio M.3</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>usuario@email.com</kbd> e a senha <kbd>1234</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          type="password"
          label="Senha"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Box
            component="div"
            sx={{
              backgroundColor: "rgb(253,236,234)",
              borderRadius: "4px",
              padding: "16px",
              margin: "16px 0",
            }}
          >
            {error}
          </Box>
        )}
        <Box textAlign="right" marginTop="16px">
          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
