import React, {useState} from 'react';
import styled from 'styled-components/native';
import {printLine, trimText} from '../utilities';

const ReadMore = styled.TouchableOpacity`
  margin-bottom: 5px;
  align-self: flex-start;
`;

const Content = styled.Text`
  color: rgb(48, 48, 48);
  margin: 5px 0;
`;

const Tag = styled(Content)`
  font-size: 13px;
  color: rgb(112, 112, 112);
`;

const bytelength = str => {
  let count = 0;
  let ch = '';
  for (var i = 0; i < str.length; i++) {
    ch = str.charAt(i);
    if (escape(ch).length == 6) {
      count++;
    }
    count++;
  }
  return count;
};

const ReadMoreLess = ({text, style}) => {
  const maxLine = 5;
  const maxLetter = 300 / (bytelength(text) / text.length);
  const lineNum = text.split(/\r\n|\r|\n/).length;
  const [isReadMore, setReadMore] = useState(
    lineNum > maxLine || text.length > maxLetter,
  );

  return (
    <>
      <Content style={style}>
        {isReadMore
          ? `${
              lineNum > maxLine
                ? printLine(text, maxLine)
                : trimText(text, maxLetter)
            }`
          : text}
      </Content>
      {(lineNum > maxLine || text.length > maxLetter) && (
        <ReadMore onPress={() => setReadMore(!isReadMore)}>
          <Tag>{isReadMore ? 'Read more' : 'Read less'}</Tag>
        </ReadMore>
      )}
    </>
  );
};

export default ReadMoreLess;
