import React, {useEffect, useRef} from 'react';
import {CellContainer} from '@shopify/flash-list';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {View} from 'react-native';

import Twitter from './Twitter';
import useBackNavigation from '../useBackNavigation';

const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

export const CustomCellRendererComponent = React.forwardRef((props: any, _) => {
  const offset = useSharedValue(400);
  const cellContainerRef = useRef<View>(null);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  }, []);
  useEffect(() => {
    offset.value = withDelay(props.index * 50, withSpring(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // You can get access to animated cell container's ref. This step is just for demonstration.
    cellContainerRef.current?.setNativeProps({opacity: 1});
  });

  const transparentStyle = {opacity: 0};

  return (
    <AnimatedCellContainer
      ref={cellContainerRef}
      {...props}
      style={[animatedStyles, transparentStyle, props.style]}
    />
  );
});

CustomCellRendererComponent.displayName = 'CustomCellRendererComponent';

const TwitterCustomCellContainer = ({navigation}: {navigation: any}) => {
  useBackNavigation(navigation);
  return (
    <Twitter
      navigation={navigation}
      disableAutoLayout
      CellRendererComponent={CustomCellRendererComponent}
    />
  );
};
export default TwitterCustomCellContainer;
