import React from 'react';
import styled from 'styled-components';

import { 
  DEFAULT_FEED_IMG,
  DEFAULT_USER_IMG,
  BUCKIT_PLACE_DATA_KEY_LIST
} from '../Constants';

import Label from './Label';

const Container = styled.div`
  margin: 20px 0 0 39px;
`;

const FeedContainer = styled.div`
  width: 268px;
  height: 314px;
  margin: 0 0 20px 20px;
  display: inline-block;
`;

const UserImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const UserNickname = styled.div`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 220px;
  margin: 7px 0 0 8px;
  font-size: 15px;
  font-weight: bold;
  position: absolute;
`;

const FeedImg = styled.img`
  width: 268px;
  height: 268px;
  border-radius: 10px;
  margin: 5px 0 0 0;
`;

const ScrapMsg = styled.div`
  width: 60%;
  height: 13vh;
  font-size: 2.5vw;
  margin: 20% auto 0 auto;
  background-color: #d0cccc38;
  border-radius: 8px;
  text-align: center;
  line-height: 13vh;
`;

class Feeds extends React.Component {
  displayFeeds = () => {
    let dataKeyList = localStorage.getItem(BUCKIT_PLACE_DATA_KEY_LIST) === null ?
      [] : JSON.parse(localStorage.getItem(BUCKIT_PLACE_DATA_KEY_LIST));

    if(this.props.feeds.length > 0) {
      return this.props.feeds.map((feed, index) => {
        let keyIndex = dataKeyList.indexOf(feed.id); // 스크랩 되어있는 Feed인지 확인
        
        return (
          <FeedContainer key={index}>
            <UserImg 
              src={feed.profile_image_url} 
              onError={(e)=>e.target.src=DEFAULT_USER_IMG} />
            <UserNickname>{feed.nickname}</UserNickname>
            <FeedImg
              src={feed.image_url}
              onError={(e)=>e.target.src=DEFAULT_FEED_IMG} />
            <Label 
              isStored={keyIndex > -1} 
              feedData={feed} />
          </FeedContainer>
          )
      })
    } else { // Feed Data가 없다면
      return (
        <ScrapMsg>{"스크랩한 정보가 없습니다."}</ScrapMsg>
      )
    }  
  }

  render() {
    return(
      <Container>
        {this.displayFeeds()}
      </Container>
    )
  }
}

export default Feeds;
