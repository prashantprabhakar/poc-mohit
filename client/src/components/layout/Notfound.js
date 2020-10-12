import React from 'react'
import './NotFound.css'
const NotFound = () => {


  return (
    <div id="container">
      <div className="skullbottom" data-bind="attr: { style:'-webkit-transform:perspective(1000px) rotateY(' + relativeMouse.x() + 'deg) rotateX(' + relativeMouse.y() + 'deg);transform:perspective(0px) rotateY(' + relativeMouse.x() + 'deg) rotateX(' + relativeMouse.y() + 'deg)' }">
        <div className="skulltop"></div>
      </div>
      <div style={{'textAlign': 'center', paddingTop: '85px'}}>
        <h2> Oooo.... You must not be here.. </h2>
        <h1 style={{color: 'red'}}> RUN !!!! </h1>
        </div> 
    </div>
  
  )
}

export default NotFound