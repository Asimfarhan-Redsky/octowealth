import { createContext, useState } from "react";

export const HideBottomTabContext = createContext();
const HideBottomTabProvider = ({ children }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleExpensePress = () => {
        setTooltipVisible(false);
        setDrawerVisible(true);
    };

    return (
        <HideBottomTabContext.Provider value={{ drawerVisible, setDrawerVisible, handleExpensePress, setTooltipVisible, tooltipVisible }}>
            {children}
        </HideBottomTabContext.Provider>
    )
}

export default HideBottomTabProvider;