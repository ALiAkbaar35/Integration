// eslint-disable-next-line no-unused-vars
import React from "react";
import { AuthProvider } from "./contexts/authContext";
import { ContractProvider } from "./contexts/ContractContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import Routes from "./routes/Routes";

function App() {
    return (
        <AuthProvider>
            <ProfileProvider>

                            <ContractProvider>
                                <Routes />
                            </ContractProvider>
          
            </ProfileProvider>
        </AuthProvider>
    );
}

export default App;
