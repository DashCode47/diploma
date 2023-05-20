import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import MyClasses from "./Screens/MyClasses";
import SignInScreen from "./Screens/SignInScreen";
import PrivateRoute from "./Screens/privateRoutes/PrivateRoute ";
import SignUpScreen from "./Screens/SignUpScreen";
import TestPrivate from "./Screens/privateRoutes/TestPrivate";
import LogOutScreen from "./Screens/LogOutScreen";

import "react-toastify/dist/ReactToastify.css";
import DetailClass from "./Screens/privateRoutes/DetailClass";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  /* const [token, setToken] = useState(false); */

  const tokenStorage = localStorage.getItem("accessToken");
  /*  useEffect(() => {
    if (!!tokenStorage) {
        setToken(() => true);
      console.log("token saved", tokenStorage);
    } else console.log("no token");
  }, []); */

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/SignUp" element={<SignUpScreen />} />
        <Route
          exact
          path="/protected"
          element={
            <PrivateRoute
              component={TestPrivate}
              isAuthenticated={tokenStorage}
            />
          }
        />

        <Route
          path="/HomeScreen"
          element={
            <PrivateRoute
              component={HomeScreen}
              isAuthenticated={tokenStorage}
            />
          }
        />

        <Route
          path="/DetailClass"
          element={
            <PrivateRoute
              component={DetailClass}
              isAuthenticated={tokenStorage}
            />
          }
        />

        <Route path="/Classes" element={<MyClasses />} />

        <Route
          path="/Profile"
          element={
            <PrivateRoute
              component={ProfileScreen}
              isAuthenticated={tokenStorage}
            />
          }
        />

        <Route
          path="/Logout"
          element={
            <PrivateRoute
              component={LogOutScreen}
              isAuthenticated={tokenStorage}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
