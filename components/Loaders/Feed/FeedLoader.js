import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import FeedList from './FeedList';
import i18n from '../../../i18n/i18n';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'white',
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

export default () => {
  const home = () => {
    let array = [];
    for (let i = 0; i < 2; i++) {
      array.push(<FeedList key={i} />);
    }
    return array;
  };
  return (
    <SafeAreaView
      style={{
        ...GlobalStyles.AndroidSafeArea,
        paddingStart: 0,
        paddingEnd: 0,
        backgroundColor: 'white',
      }}>
      <HeaderWrapper style={styles.shadow}>
        <TextInput>
          <Text>🔎 {i18n.t('뭐 먹고 싶어요?')}</Text>
        </TextInput>
        <Options>
          <Option>
            <OptionText selected={true}>둘러보기</OptionText>
            <Selected selected={true} />
          </Option>
          <Option>
            <OptionText selected={false}>친구들</OptionText>
            <Selected selected={false} />
          </Option>
          {/* <Option>
                  <OptionText>관심사</OptionText>
                  <Selected />
                </Option> */}
        </Options>
      </HeaderWrapper>
      {home()}
    </SafeAreaView>
  );
};
