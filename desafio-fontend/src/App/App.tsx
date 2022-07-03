import { useEffect, useState } from "react";
import ExpansePage from "../Pages/ExpansePage";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getFixedStartDate } from "../Helpers/calendarHelper";
import { getUserEndpoint } from "../Service/apiService";
import { IUser } from "../Interfaces/apiInterfaces";
import { LoginPage } from "../Pages/LoginPage";
import { authContext } from "../Contexts/authContext";

function App() {
  const date = getFixedStartDate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <BrowserRouter>
          <Routes>
            <Route path="/despesas/:month" element={<ExpansePage />} />
            <Route
              path="*"
              element={
                <Navigate
                  to={"/despesas/" + date.year + "-" + date.month}
                  replace
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    );
  } else {
    return <LoginPage onSignIn={setUser} />;
  }
}

export default App;
