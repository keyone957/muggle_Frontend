import React from 'react';
import {Dimensions} from 'react-native';
import {MentionInput} from 'react-native-controlled-mentions';
import styled from 'styled-components/native';
import {getAutoHashCompleted} from '../cleanedApi';
import i18n from '../i18n/i18n';
import {debounce} from 'lodash';
import {errorMsg} from '../utilities';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const Line = styled.View`
  width: 100%;
  border: 0.5px solid lightgray;
`;

const ScrollView = styled.ScrollView`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  /* min-height: 40%; */
  max-height: ${deviceWidth / 2}px;
  /* max-width: 80%; */
  background-color: white;
  z-index: 1;
  border: 1px solid #0066d6;
  border-radius: 5px;
`;

const Text = styled.Text`
  color: #0066d6;
`;

const Pressable = styled.Pressable`
  /* padding: 2px 4px;
  background-color: #ffb74d;
  border-radius: 10px;
  margin-bottom: 10px; */
  padding: 10px 15px;
`;

const searchStyle = {
  backgroundColor: '#fff',
  borderRadius: 9,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  padding: 10,
  borderWidth: 0.5,
  borderColor: 'lightgray',
};

const Block = styled.View``;

const getHashSuggestions = async keyword => {
  try {
    const {code, description, data} = await getAutoHashCompleted(keyword);
    if (code === 200) {
      return data;
    } else throw {code, description};
  } catch (error) {
    errorMsg(error?.code, error?.description);
    console.log('auto hash completed error', error);
  }
};

let suggestions = [];
let db = [];
const hashSuggestions = ({keyword, onSuggestionPress}) => {
  if (!keyword) {
    return null;
  }
  getHashSuggestions(keyword).then(res => {
    res.map((item, index) => {
      if (!db.includes(item.text)) {
        suggestions.push({id: index, name: item.text.trim()});
        db.push(item.text);
      }
    });
  });

  return (
    suggestions.length > 0 && (
      <ScrollView>
        {suggestions
          .filter(one =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
          )
          .map(one => (
            <Block key={one.id}>
              <Pressable
                onPress={() => {
                  onSuggestionPress(one);
                  suggestions = [];
                  db = [];
                }}>
                <Text>#{one.name}</Text>
              </Pressable>
              <Line />
            </Block>
          ))}
      </ScrollView>
    )
  );
};

export const HashInput = ({value, setValue, style}) => {
  return (
    <MentionInput
      value={value}
      onChange={text => setValue(prev => ({...prev, hash: text}))}
      partTypes={[
        {
          trigger: '#',
          renderSuggestions: debounce(hashSuggestions, 1000, {
            leading: true,
            trailing: false,
          }),
          textStyle: {color: '#0066d6'},
        },
      ]}
      style={style}
      placeholder={i18n.t('해시태그를 입력해주세요 (ex) #떡볶이')}
      multiline={false}
    />
  );
};

export const SearchInput = ({value, setValue, searchByTerm}) => {
  return (
    <MentionInput
      value={value}
      onChange={text => setValue(text)}
      onSubmitEditing={() => searchByTerm()}
      placeholder={i18n.t('🔎 검색할 단어를 입력해주세요')}
      returnKeyType={'search'}
      style={searchStyle}
      multiline={false}
      partTypes={[
        {
          trigger: '#',
          renderSuggestions: hashSuggestions,
          textStyle: {color: 'black'},
          isBottomMentionSuggestionsRender: true,
        },
      ]}
    />
  );
};
