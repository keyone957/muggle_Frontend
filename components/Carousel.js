import React, {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import VideoPlayer from './VideoPlayer';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ImageModal from 'react-native-image-modal';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const Container = styled.View`
  width: 100%;
`;

const CarouselView = styled.View``;

const MyCarousel = ({mediaArr}) => {
  const [indexSelected, setIndexSelected] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({item, index}) => {
    const {uri} = item;
    const myRegexp = /^.*\/(.*)\.(.*)$/g;
    const match = myRegexp.exec(uri.toLowerCase());
    if (match[2] === 'mp4' || match[2] === 'mov') {
      return (
        <VideoPlayer
          isSelected={indexSelected === index}
          uri={uri}
          key={index}
        />
      );
    } else {
      return (
        <ImageModal
          key={index}
          source={{uri}}
          imageBackgroundColor="white"
          style={{
            width: deviceWidth,
            aspectRatio: 1,
          }}
          resizeMode={'contain'}
          modalImageStyle={{backgroundColor: 'white'}}
        />
      );
    }
  };

  return (
    <Container>
      <CarouselView>
        <Carousel
          ref={carouselRef}
          data={mediaArr}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          renderItem={renderItem}
          onSnapToItem={index => setIndexSelected(index)}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.7}
        />
      </CarouselView>
      <Pagination
        inactiveDotColor="gray"
        dotColor="rgb(24, 76, 95)"
        activeDotIndex={indexSelected}
        dotsLength={mediaArr.length}
        animatedDuration={0}
        dotStyle={{width: 5, height: 5}}
        inactiveDotScale={0.7}
        containerStyle={{paddingVertical: 10}}
        tappableDots={true}
        carouselRef={carouselRef}
      />
    </Container>
  );
};

export default MyCarousel;
