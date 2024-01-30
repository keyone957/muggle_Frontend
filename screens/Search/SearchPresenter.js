import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native';
import {SearchList} from '../../components/Lists';
import i18n from '../../i18n/i18n';
import SearchLoader from '../../components/Loaders/Search/SearchLoader';
import CloseIcon from '../../assets/close.svg';
import GlobalStyles from '../../components/GlobalStyles';
import BackArrow from '../../assets/backarrow.svg';
// import {SearchInput} from '../../components/MentionInput';

const Container = styled.View`
  background-color: rgb(249, 243, 241);
  flex: 1;
  padding: 20px 15px 30px 15px;
`;

const HeaderWrapper = styled.View`
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  padding: 0 10px;
`;

const Nothing = styled.Text`
  text-align: center;
  font-size: 16px;
  color: rgb(112, 112, 112);
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
`;

const TextInput = styled.TextInput`
  border-radius: 9px;
  padding: 8px 10px;
  border: 1px solid lightgray;
  width: 90%;
  background-color: whitesmoke;
`;

const MenuBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 32px;
  flex-wrap: wrap;
  background-color: white;
`;

const Menu = styled.TouchableOpacity`
  width: 30%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding-bottom: 0;
`;

const Selected = styled.View`
  width: 100%;
  border: ${props =>
    props.pressed ? '2px solid #dc4f0f' : '2px solid transparent'}; ;
`;

const MenuText = styled.Text`
  color: ${props => (props.pressed ? '#dc4f0f' : 'black')};
  font-weight: bold;
  margin-bottom: 5px;
`;

const RecentWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px 0;
`;

const RecentTitle = styled(RecentWrapper)`
  justify-content: space-between;
`;

const RecentBox = styled.TouchableOpacity`
  border: 0.5px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  min-width: 40px;
  margin: 0 10px 10px 0;
  flex-direction: row;
`;

const RecentText = styled.Text`
  color: ${props => (props.delete ? 'rgb(88, 88, 88)' : 'black')};
`;

const DeleteRecent = styled.TouchableOpacity``;
const DeleteOne = styled(DeleteRecent)`
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border-radius: 10px;
  background-color: rgb(88, 88, 88);
  opacity: 0.6;
  padding: 2px;
`;

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
`;

const BackTouch = styled.TouchableOpacity`
  /* padding: 10px;
  padding-left: 0; */
  align-self: flex-start;
  /* width: 5%; */
`;

export default ({
  term,
  setTerm,
  all,
  tags,
  users,
  searchByTerm,
  loading,
  onEndReached,
  value,
  setValue,
  msg,
  recentTerms,
  removeRecentTerm,
  removeAllTerms,
  goBack,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <SafeAreaView
          style={{
            ...GlobalStyles.AndroidSafeArea,
            paddingStart: 0,
            paddingEnd: 0,
            backgroundColor: 'white',
            flex: 0,
          }}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <HeaderWrapper>
            <RowWrapper>
              <BackTouch onPress={goBack}>
                <BackArrow width={27} height={27} />
              </BackTouch>
              <TextInput
                placeholder={i18n.t('🔎 검색할 단어를 입력해주세요')}
                value={term}
                onChangeText={setTerm}
                returnKeyType={'search'}
                onSubmitEditing={() => searchByTerm()}
              />
              {/* <SearchInput
                value={term}
                setValue={setTerm}
                searchByTerm={searchByTerm}
              /> */}
            </RowWrapper>
            <MenuBar>
              <Menu
                pressed={value === '1'}
                onPress={() => setValue('1')}
                disabled={value === '1'}>
                <MenuText pressed={value === '1'}>All</MenuText>
                <Selected pressed={value === '1'} />
              </Menu>
              <Menu
                pressed={value === '2'}
                onPress={() => setValue('2')}
                disabled={value === '2'}>
                <MenuText pressed={value === '2'}>Hash Tags</MenuText>
                <Selected pressed={value === '2'} />
              </Menu>
              <Menu
                pressed={value === '3'}
                onPress={() => setValue('3')}
                disabled={value === '3'}>
                <MenuText pressed={value === '3'}>Users</MenuText>
                <Selected pressed={value === '3'} />
              </Menu>
            </MenuBar>
          </HeaderWrapper>
        </SafeAreaView>
        <Container>
          {loading ? (
            <SearchLoader />
          ) : (
            all.length === 0 &&
            recentTerms.length > 0 && (
              <>
                <RecentTitle>
                  <RecentText>{i18n.t('최근 검색어')}</RecentText>
                  <DeleteRecent onPress={removeAllTerms}>
                    <RecentText delete={true}>{i18n.t('전체삭제')}</RecentText>
                  </DeleteRecent>
                </RecentTitle>
                <RecentWrapper>
                  {recentTerms.map((item, deletingIndex) => (
                    <RecentBox
                      key={deletingIndex}
                      onPress={() => {
                        setTerm(item);
                        searchByTerm(item);
                      }}>
                      <DeleteOne
                        onPress={() => removeRecentTerm(deletingIndex)}>
                        <CloseIcon width={13} height={13} />
                      </DeleteOne>
                      <RecentText>{item}</RecentText>
                    </RecentBox>
                  ))}
                </RecentWrapper>
              </>
            )
          )}
          {loading ? (
            <SearchLoader />
          ) : (value === '1' && all.length === 0) ||
            (value === '2' && tags.length === 0) ||
            (value === '3' && users.length === 0) ? (
            <Nothing>{msg}</Nothing>
          ) : (
            <SearchList
              all={all}
              tags={tags}
              users={users}
              loading={loading}
              value={value}
            />
          )}
        </Container>
      </>
    </TouchableWithoutFeedback>
  );
};
