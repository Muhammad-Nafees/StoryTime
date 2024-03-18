/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './store';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';


const UserApp = () => {
    return (
        <>
            <Provider store={store}>
                <MenuProvider>
                    <App />
                </MenuProvider>
            </Provider>
        </>
    )
};



AppRegistry.registerComponent(appName, () => UserApp);
