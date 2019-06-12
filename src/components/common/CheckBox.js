import React from 'react';

import './common.css';

class CheckBox extends React.Component {

  render() {
    return(
      <div>
        <input type="checkbox" className="form-checkbox" id="check-one" onClick={()=>this.props.toggleFeeds()} />
        <label htmlFor="check-one">스크랩한 것만 보기</label>
      </div>
    )
  }
}

export default CheckBox;
