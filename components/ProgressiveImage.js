import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import Logo from '../assets/bigMuggl.svg';
import FastImage from 'react-native-fast-image';

const Fast = Animated.createAnimatedComponent(FastImage);

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e0e0e0',
  },
});

const LogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {thumbnailSource, source, style, ...props} = this.props;

    return (
      <View style={styles.container}>
        {!source.uri ? (
          <LogoWrapper>
            <Logo width={200} height={200} />
          </LogoWrapper>
        ) : (
          <Fast
            source={thumbnailSource}
            style={[style, {opacity: this.thumbnailAnimated}]}
            onLoad={this.handleThumbnailLoad}
            blurRadius={6}
          />
        )}
      </View>
    );
  }
}

export default ProgressiveImage;
