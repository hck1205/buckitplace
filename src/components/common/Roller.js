import React from 'react';

import './common.css';

class Roller extends React.Component {
  render() {
    return(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default Roller;
