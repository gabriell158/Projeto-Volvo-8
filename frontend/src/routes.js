import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Vehicles from './pages/Vehicles';
import NewVehicle from './pages/NewVehicle';
import Equipments from './pages/Equipments';
import NewEquipment from './pages/NewEquipment';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/vehicles" component={Vehicles} />
                <Route path="/newVehicle" component={NewVehicle} />
                <Route path="/equipments" component={Equipments} />
                <Route path="/newEquipment" component={NewEquipment} />
            </Switch>
        </BrowserRouter>
    );
}