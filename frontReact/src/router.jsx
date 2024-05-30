import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import Login from "./view/login";
import DefaultLayout from "./components/DefaultLayout";
import Accueil from "./view/Accueil";
import Liste from "./view/Liste";
import Ajoutemploye from "./view/Ajoutemploye";
import Info from "./view/info";
import ModifierEmp from "./view/ModifierEmp";
import ModifierAction from "./view/ModifierAction";
import Action from "./view/Actions";
import Payment from "./view/payment";
import Pdf from "./view/pdf";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="/defaultLayout" element={<DefaultLayout />}>
                    <Route
                        path="/defaultLayout/accueil"
                        element={<Navigate to="/defaultLayout" />}
                    />
                    <Route path="/defaultLayout" element={<Accueil />} />
                    <Route path="/defaultLayout/liste" element={<Liste />} />
                    <Route
                        path="/defaultLayout/payment"
                        element={<Payment />}
                    />
                    <Route
                        path="/defaultLayout/Ajouter"
                        element={<Ajoutemploye />}
                    />
                    <Route
                        path="/defaultLayout/info/:num_emp"
                        element={<Info />}
                    />
                    <Route
                        path="/defaultLayout/info/modifier/:num_emp"
                        element={<ModifierEmp />}
                    />
                    <Route
                        path="/defaultLayout/info/action/:num_emp"
                        element={<Action />}
                    />
                    <Route
                        path="/defaultLayout/info/modifierAction/:num_emp/:ref"
                        element={<ModifierAction />}
                    />
                    <Route
                        path="/defaultLayout/payment/pdf/:num_emp/:num_payment"
                        element={<Pdf />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;
