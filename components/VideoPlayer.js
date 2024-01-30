import React, {useRef, useState} from 'react';
import Video from 'react-native-video-controls';
import styled from 'styled-components/native';
import VideoIcon from '../assets/video.svg';

const Container = styled.View`
  width: 100%;
`;

const Icon = styled.View`
  position: absolute;
  bottom: 3%;
  left: 2%;
  z-index: 1;
  opacity: 0.6;
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const VideoPlayer = ({uri, isSelected}) => {
  const video = useRef(null);
  const [showIcon, setShowIcon] = useState(true);

  const onEnd = () => {
    setTimeout(() => video.current.seekTo(0), 0);
  };

  return (
    <Container activeOpacity={0}>
      {showIcon && (
        <Icon>
          <VideoIcon width={25} height={25} />
        </Icon>
      )}
      <Video
        ref={video}
        style={{aspectRatio: 1}}
        resizeMode={'contain'}
        source={{uri}}
        ignoreSilentSwitch="ignore"
        paused={!isSelected}
        repeat={true}
        toggleResizeModeOnFullscreen={false}
        disableFullscreen={true}
        disableVolume={true}
        disableBack={true}
        onShowControls={async () => {
          setShowIcon(false);
          await video.current.setState({muted: !video.current.state.muted});
          await video.current.setState({muted: !video.current.state.muted});
        }}
        showOnStart={false}
        playWhenInactive={false}
        onEnd={onEnd}
        onError={err => console.log('video error', err)}
      />
    </Container>
  );
};

export default VideoPlayer;
