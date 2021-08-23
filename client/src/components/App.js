import React from "react";
import Signup from "./Signup";

import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../redux/store";

import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Search from "./Search";
import Details from "./Details";
import Rating from "./Rating";
import Terms from './screens/PhotographerFlow/Terms';

import "./index.css";
import LoginFlow from "./screens/LoginFlow";
import UploadedImage from "./screens/PhotographerFlow/UploadedImage";
import PhotographerDashboard from "./screens/PhotographerFlow/PhotographerDashboard";
import BusinessDashboard from './screens/BusinessFlow/BusinessDashboard';
import RateThisImageScreen from "./screens/BusinessFlow/RateThisImageScreen";

function App() {
  return (
    <div>
      <Provider store={configureStore()}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              {/* search */}
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/details" component={Details} />
              {/* rating */}
              <PrivateRoute path="/rating" component={Rating} />
              {/* <PrivateRoute path="/search" component={Search} /> */}
              <Route path="/home" component={LoginFlow} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/terms" component={Terms} />
              <PrivateRoute path="/uploaded-image" component={UploadedImage} />
              <PrivateRoute path="/rate-image" component={RateThisImageScreen} />
              <PrivateRoute path="/photographer-dashboard" component={PhotographerDashboard} />
              <PrivateRoute path="/business-dashboard" component={BusinessDashboard} />
              
            </Switch>
          </AuthProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
