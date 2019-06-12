import React from 'react';
import styled from 'styled-components';

import { 
  SCRAP_LABEL_BEFORE,
  SCRAP_LABEL_AFTER,
  DEFAULT_LABEL_IMG,
  BUCKIT_PLACE_DATA_KEY_LIST,
  BUCKIT_PLACE_DATA_LIST
} from '../Constants';

const LabelContainer = styled.div`
  float: right;
  position: relative;
  bottom: 44px;
  right: 11px;
  cursor: pointer;
`

const LabelImg = styled.img`
  width: 32px;
  height: 32px;
`

class Label extends React.Component {

  toggleData(e) {  

    let dataKeyList = localStorage.getItem(BUCKIT_PLACE_DATA_KEY_LIST) === null ?
      [] : JSON.parse(localStorage.getItem(BUCKIT_PLACE_DATA_KEY_LIST));

    let dataList = localStorage.getItem(BUCKIT_PLACE_DATA_LIST) === null ? 
      [] : JSON.parse(localStorage.getItem(BUCKIT_PLACE_DATA_LIST));
    
    
    if(e.target.getAttribute('src') === SCRAP_LABEL_BEFORE) { // 스크랩할때
      if(Array.isArray(dataList) && Array.isArray(dataKeyList)) {
        dataList.push(this.props.feedData);
        dataKeyList.push(this.props.feedData.id);
        localStorage.setItem('buckitplaceDataList',JSON.stringify(dataList));
        localStorage.setItem('buckitplaceDataKeyList',JSON.stringify(dataKeyList));
      }
      e.target.src = SCRAP_LABEL_AFTER
    } else { // 스크랩 취소 했을때 
      if(Array.isArray(dataList) && Array.isArray(dataKeyList)) {
        let index = dataKeyList.indexOf(this.props.feedData.id);
        if(index > -1) {
          dataKeyList.splice(index, 1);
          dataList.splice(index, 1);
          localStorage.setItem('buckitplaceDataList',JSON.stringify(dataList));
          localStorage.setItem('buckitplaceDataKeyList',JSON.stringify(dataKeyList));
        }
      }
      e.target.src = SCRAP_LABEL_BEFORE
    }
  }

  render() {
    return(
      <LabelContainer>
        <LabelImg 
          src={this.props.isStored ? SCRAP_LABEL_AFTER : SCRAP_LABEL_BEFORE} 
          onClick={(e)=>this.toggleData(e)} 
          onError={(e)=>e.target.src=DEFAULT_LABEL_IMG} />
      </LabelContainer>
    )
  }
}

export default Label;
