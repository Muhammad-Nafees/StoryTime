import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Navigations from "./Navigations";



const MainStack = () => {

    return (
        <NavigationContainer independent={true}>
            <Navigations />
        </NavigationContainer>
    )

}

export default MainStack;
