import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { View, Text } from "react-native"
import { useSelector } from "react-redux"

const Routes = () => {
    
    const state = useSelector((state) => state.userSlice)

    console.log(state)

    return (
        state.name ? <MainStack /> : <AuthStack />
    )
}

export default Routes;