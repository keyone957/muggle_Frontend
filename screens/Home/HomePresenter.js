import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {HomeFeedlList} from '../../components/Lists';
import GlobalStyles from '../../components/GlobalStyles';
import Logo from '../../assets/bigMuggl.svg';
import Bell from '../../assets/bell.svg';
import RedDot from '../../assets/redDot.svg';
import i18n from '../../i18n/i18n';
import FeedLoader from '../../components/Loaders/Feed/FeedLoader';
import ErrorPage from '../../components/ErrorPage';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  flex-wrap: wrap;
  background-color: white;
`;

const Column = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Nothing = styled.Text`
  font-size: 16px;
  color: rgb(112, 112, 112);
  text-align: center;
  margin-top: 60%;
`;

const BellWrapper = styled.View``;

const DotWrapper = styled.View`
  position: absolute;
  top: -2px;
  left: -2px;
`;

const TextInput = styled.TouchableOpacity`
  background-color: #fafafa;
  border-radius: 9px;
  padding: 8px 10px;
  border: 1px solid lightgray;
  width: 100%;
  margin: 5px 0;
`;

const Text = styled.Text`
  color: lightgray;
`;

const Background = styled.View`
  background-color: #f9f3f1;
  flex: 1;
`;

const Options = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Option = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding-bottom: 0;
  width: 50%;
`;

const Selected = styled.View`
  width: 100%;
  border: ${props =>
    props.selected ? '2px solid #dc4f0f' : '2px solid transparent'};
  background-color: ${props => (props.selected ? ' #dc4f0f' : ' transparent')};
`;

const OptionText = styled.Text`
  color: ${props => (props.selected ? '#dc4f0f' : 'black')};
  font-weight: bold;
  margin-bottom: 5px;
`;

export default ({
  data,
  loading,
  onEndReached,
  refresh,
  handleRefresh,
  goToWhere,
  isNewPush,
  setIsNewPush,
  showErrorPage,
  setShowErrorPage,
  setTrigger,
  spinner,
  menu,
  setMenu,
  followingData,
}) => {
  return showErrorPage ? (
    <ErrorPage
      code={showErrorPage?.code}
      description={showErrorPage?.description}
      func={{setRefresh: setTrigger, setShowErrorPage}}
      showBackArrow={false}
    />
  ) : (
    <SafeAreaView
      style={{
        ...GlobalStyles.AndroidSafeArea,
        paddingStart: 0,
        paddingEnd: 0,
        backgroundColor: 'white',
      }}>
      <View style={{overflow: 'hidden', paddingBottom: 5}}>
        <HeaderWrapper>
          <Column>
            <Logo width={width * 0.2} height={40} />
            <TouchableOpacity
              onPress={() => goToWhere('Notification', {setIsNewPush})}>
              <BellWrapper>
                {isNewPush && (
                  <DotWrapper>
                    <RedDot />
                  </DotWrapper>
                )}
                <Bell width={20} height={20} />
              </BellWrapper>
            </TouchableOpacity>
          </Column>
        </HeaderWrapper>
      </View>
      <Background>
        {loading ? (
          <FeedLoader />
        ) : (
          <HomeFeedlList
            data={menu === 1 ? data : followingData}
            onEndReached={() => onEndReached(menu)}
            loading={spinner}
            refresh={refresh}
            handleRefresh={handleRefresh}
            ListEmptyComponent={
              <Background>
                <Nothing>
                  {i18n.t(
                    menu === 1
                      ? '다양한 먹거리를 기록해보세요! 😆'
                      : '여러 사람을 팔로우 해보세요!',
                  )}
                </Nothing>
              </Background>
            }
            ListHeaderComponent={
              refresh ? (
                <></>
              ) : (
                <HeaderWrapper style={styles.shadow}>
                  <TextInput
                    activeOpacity={1}
                    onPress={() => goToWhere('Search')}>
                    <Text>🔎 {i18n.t('뭐 먹고 싶어요?')}</Text>
                  </TextInput>
                  <Options>
                    <Option onPress={() => setMenu(1)}>
                      <OptionText selected={menu === 1}>둘러보기</OptionText>
                      <Selected selected={menu === 1} />
                    </Option>
                    <Option onPress={() => setMenu(2)}>
                      <OptionText selected={menu === 2}>친구들</OptionText>
                      <Selected selected={menu === 2} />
                    </Option>
                  </Options>
                </HeaderWrapper>
              )
            }
          />
        )}
      </Background>
    </SafeAreaView>
  );
};
