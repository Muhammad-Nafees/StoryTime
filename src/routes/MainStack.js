import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Navigations from "./Navigations";



const MainStack = () => {
    console.log('MainStack')

    const Stack = createStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Navigations />
        </NavigationContainer>
    )

}

export default MainStack;
