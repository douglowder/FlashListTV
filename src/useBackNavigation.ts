import React from 'react';

import {TVEventControl, BackHandler} from 'react-native';

const useBackNavigation = (navigation: {goBack: () => void}) => {
  React.useEffect(() => {
    // On Apple TV, the menu key must not have an attached gesture handler,
    // otherwise it will not navigate out of the app back to the Apple TV main screen
    // as expected by Apple guidelines.
    TVEventControl.enableTVMenuKey();
    // Enable back navigation with Apple TV menu key or Android back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    // This cleans up the back nav handler on unmount
    return () => {
      backHandler.remove();
      TVEventControl.disableTVMenuKey();
    };
  });
};

export default useBackNavigation;
