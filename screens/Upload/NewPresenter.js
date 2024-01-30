import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import GlobalStyles from '../../components/GlobalStyles';
import Loader from '../../components/Loaders/Loader';
import Video from 'react-native-video-controls';
import i18n from '../../i18n/i18n';
import {HashInput} from '../../components/MentionInput';
import UpLoadmodal from '../../components/Loaders/UpLoadmodal';
import VideoIcon from '../../assets/addVideo.svg';
import ImageIcon from '../../assets/addPhoto.svg';
import CloseIcon from '../../assets/close.svg';
import AddIcon from '../../assets/add.svg';
import ImageModal from 'react-native-image-modal';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const styles = StyleSheet.create({
  textinput: {
    textAlignVertical: 'top',
    width: '100%',
    paddingVertical: 0,
  },
});

const Field = styled.View`
  background-color: white;
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 10px;
`;

const FieldName = styled.Text`
  color: rgb(24, 76, 95);
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const GreyText = styled.Text`
  font-size: 13px;
  color: rgb(112, 112, 112);
  margin-left: 5px;
  margin-bottom: 8px;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MediaBox = styled.View`
  margin-right: 15px;
`;

const DeleteMedia = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  background-color: crimson;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0%;
  right: -5%;
`;

const DoneBtn = styled.TouchableOpacity`
  width: 162px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.confirm ? 'rgb(220, 79, 15)' : 'rgb(112,112,112)'};
  border-radius: 24px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 100px;
`;

const BtnText = styled.Text`
  font-size: 15px;
  color: ${props => props.color};
  font-weight: bold;
`;

const menutrigerStyles = {
  triggerOuterWrapper: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  triggerWrapper: {
    backgroundColor: '#0066d6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 80,
    height: 80,
  },
};
const menutrigerStyles2 = {
  triggerOuterWrapper: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  triggerWrapper: {
    backgroundColor: 'rgb(112,112,112)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 80,
    height: 80,
  },
};
const optionsStyles = {
  optionsWrapper: {
    width: 55,
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  optionsContainer: {
    width: 55,
    backgroundColor: 'transparent',
    marginLeft: 80,
    marginTop: 15,
  },
};
const optionStyles = {
  optionWrapper: {
    borderRadius: 50,
    backgroundColor: 'rgb(220, 79, 15)',
    marginBottom: 5,
  },
};

export default ({
  uploadInfo,
  setInfo,
  pickPhotos,
  pickVideos,
  sendUploadInfo,
  isConfirm,
  setConfirm,
  mediaArr,
  setMediaArr,
  loading,
  isModalVisible,
  progress,
  resetProgress,
}) => {
  const {title, description, hash, link, location} = uploadInfo;

  return loading ? (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Loader />
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{...GlobalStyles.AndroidSafeArea, paddingStart: 0, paddingEnd: 0}}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(249, 243, 241)" />
      <UpLoadmodal progress={progress} isModalVisible={isModalVisible} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView>
          <Field>
            <RowWrapper>
              <FieldName>Upload Files</FieldName>
              {mediaArr.length === 5 && (
                <GreyText>
                  {i18n.t('사진과 영상을 총 5개까지 올릴 수 있습니다')}
                </GreyText>
              )}
            </RowWrapper>
            <RowWrapper>
              <Menu>
                <MenuTrigger
                  disabled={mediaArr.length === 5}
                  customStyles={
                    mediaArr.length === 5 ? menutrigerStyles2 : menutrigerStyles
                  }>
                  <AddIcon width={40} height={40} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption onSelect={pickPhotos} customStyles={optionStyles}>
                    <ImageIcon width={35} height={35} />
                  </MenuOption>
                  <MenuOption onSelect={pickVideos} customStyles={optionStyles}>
                    <VideoIcon width={35} height={35} />
                  </MenuOption>
                </MenuOptions>
              </Menu>
              <ScrollView horizontal={true}>
                {mediaArr.map((media, deletingIndex) => (
                  <MediaBox key={deletingIndex}>
                    {!media.uri.includes('MOV') ? (
                      <ImageModal
                        key={deletingIndex}
                        source={{uri: media.uri}}
                        imageBackgroundColor="white"
                        style={{
                          width: 80,
                          aspectRatio: 1,
                          borderRadius: 10,
                        }}
                        resizeMode={'contain'}
                        modalImageStyle={{backgroundColor: 'white'}}
                      />
                    ) : (
                      <Video
                        style={{width: 80, height: 80}}
                        source={{uri: media.uri}}
                        disableFullscreen={true}
                        disablePlayPause={true}
                        disableSeekbar={true}
                        disableVolume={true}
                        disableTimer={true}
                        disableBack={true}
                        paused={true}
                        resizeMode={'contain'}
                      />
                    )}
                    <DeleteMedia
                      onPress={() => {
                        setMediaArr(
                          mediaArr.filter(
                            (item, index) => index !== deletingIndex,
                          ),
                        );
                      }}>
                      <CloseIcon />
                    </DeleteMedia>
                  </MediaBox>
                ))}
              </ScrollView>
            </RowWrapper>
          </Field>
          <Field>
            <FieldName>
              Title <GreyText>{i18n.t('(*필수 입력란)')}</GreyText>
            </FieldName>
            <TextInput
              style={styles.textinput}
              multiline={true}
              placeholder={i18n.t('해 먹은 것')}
              value={title}
              onChangeText={text => {
                if (text.trim().length === 0) setConfirm(false);
                else setConfirm(true);
                setInfo(prev => ({...prev, title: text}));
              }}
            />
          </Field>
          <Field>
            <FieldName>Description</FieldName>
            <TextInput
              style={styles.textinput}
              multiline={true}
              placeholder={i18n.t('재료나 레시피, 나만의 팁 etc')}
              value={description}
              onChangeText={text =>
                setInfo(prev => ({...prev, description: text}))
              }
            />
          </Field>
          <Field>
            <FieldName>Hash Tag</FieldName>
            <HashInput
              style={styles.textinput}
              value={hash}
              setValue={setInfo}
            />
          </Field>
          <Field>
            <FieldName>Link</FieldName>
            <TextInput
              style={styles.textinput}
              multiline={true}
              placeholder={`${i18n.t(
                '재료나 레시피에 대한 링크를 올려보세요',
              )}\n(ex) https://...`}
              value={link}
              onChangeText={text => setInfo(prev => ({...prev, link: text}))}
            />
          </Field>
          <Field>
            <FieldName>Location</FieldName>
            <TextInput
              style={styles.textinput}
              multiline={true}
              placeholder={i18n.t('위치를 입력해주세요')}
              value={location}
              onChangeText={text =>
                setInfo(prev => ({...prev, location: text}))
              }
            />
          </Field>
          <DoneBtn
            onPress={() => {
              sendUploadInfo();
              resetProgress();
            }}
            confirm={isConfirm}
            disabled={!isConfirm}>
            <BtnText color={'white'}>Upload</BtnText>
          </DoneBtn>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
