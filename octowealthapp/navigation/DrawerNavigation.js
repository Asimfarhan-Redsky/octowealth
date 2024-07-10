
import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer"
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import {blackColor, homeButtonBackGround, modalbackgroundColor } from '../constants/colors';



const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: modalbackgroundColor,
                    borderTopRightRadius: 30,
                },
                drawerActiveTintColor: homeButtonBackGround,
                drawerLabelStyle: {
                    color: blackColor
                }
            }}
        >
            <Drawer.Screen name="Home" component={BottomTabNavigator}
                options={{
                    headerShown: false
                }}
            />

        </Drawer.Navigator>
    )
}

export default DrawerNavigation