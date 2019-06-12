import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { 
  BASE_FEEDS_API, 
  ERROR_MSG,
  BUCKIT_PLACE_DATA_LIST
} from '../Constants';

import Feeds from './Feeds';
import Roller from './common/Roller';
import CheckBox from './common/CheckBox';

const ErrorMsg = styled.div`
  width: 100vw;
  text-align: center;
  font-size: 8vh;
  margin-top: 10%;
`

const Container = styled.div`
  background: #fff;
  width: auto;
  height: auto;
  max-width: 1256px;
  margin: 0 auto 0 auto;
`;

const ChkboxContainer = styled.div`
  margin: 30px 0 0 59px;
`;

const RollerContainer = styled.div`
  margin: 0 auto 0 auto;
  width: 65px;
`;

const ButtonToTop = styled.div`
  width: 40px;
  height: 40px;
  background-color: #21b8da;
  color: #fff;
  position: fixed;
  right: 3vw;
  bottom: 3vh;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      feeds: [],
      tempFeeds: [],
      page: 1,
      error: false,
      isScrapedMode: false
    }
  }

  componentWillMount() {
    this.fetchFeeds();
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('content-container');
    if (this.isBottom(wrappedElement)) {
      this.fetchFeeds();
    }
  };

  fetchFeeds = () => {

    if(!this.state.isScrapedMode) {
      // 스크랩 데이터 가져오기
      let localStorageDataList = localStorage.getItem(BUCKIT_PLACE_DATA_LIST) === null ? 
      [] : JSON.parse(localStorage.getItem(BUCKIT_PLACE_DATA_LIST));

      // 최조 Entry시 Page_1 데이터 가져오기
      axios.get(BASE_FEEDS_API+`page_${this.state.page}.json`)
      .then((res) => {
        if(res.status !== 200) {
          this.setState({ error: true })
        } else {
          this.setState({
            feeds: this.state.feeds.concat(res.data),
            isLoading: false,
            page: this.state.page + 1,
            tempFeeds: localStorageDataList
          })  
        }
      }).catch(e => {
        if(e.response.status === 403) {
          // 모든 페이지를 불러왔을 경우 이벤트 리스너 해제
          document.removeEventListener('scroll', this.trackScrolling);  
        } else {
          this.setState({ error: true })  
        }
      })
    }
  }

  toggleFeeds = () => {
    // TempFeeds에 저장할 데이터 업데이트
    let localStorageDataList = localStorage.getItem(BUCKIT_PLACE_DATA_LIST) === null ? 
    [] : JSON.parse(localStorage.getItem(BUCKIT_PLACE_DATA_LIST));
    
    this.setState({
      feeds: this.state.isScrapedMode ? this.state.tempFeeds : localStorageDataList,
      tempFeeds: this.state.isScrapedMode ? localStorageDataList : this.state.feeds,
      isScrapedMode: !this.state.isScrapedMode
    });
  }

  goToTop = () => {
    window.scrollTo(0, 0);
  }
 
  render() {
    if(this.state.error) {
      return <ErrorMsg>{ERROR_MSG}</ErrorMsg>
    } else {
      return (
        <Container id="content-container">
          <ChkboxContainer>
            <CheckBox toggleFeeds={this.toggleFeeds}/>
          </ChkboxContainer>
          <Feeds feeds = { this.state.feeds } />
          {
            this.state.isLoading ? 
            <RollerContainer>
              <Roller />
            </RollerContainer> : <React.Fragment />
          }
          <ButtonToTop onClick={()=>this.goToTop()}>TOP</ButtonToTop>
        </Container>
      )
    }
  }
}

export default Content;
