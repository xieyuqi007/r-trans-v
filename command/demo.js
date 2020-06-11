import React, { Component } from 'react';
import Swiper from 'common/ad-banner';
// import Swiper from 'common/swiper';
import "./Test.css";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      isautoplay: true,
      swiperData: ["https://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpghttps://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpg", "https://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpg"]
    }
  }

  componentDidMount() {
    console.log("start");
  }

  componentWillUnmount() {
    console.log("over");
  }

  handleSudaAndJump() {
    console.log("handle")
  }

  // dataWrap = {
  // 	swiperData: ["https://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpghttps://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpg", "https://wx2.sinaimg.cn/thumb180/006nphEAgy1gfg23yj124j31kw1kw77p.jpg"]
  // }

  render() {
    const opts = {
      isautoplay: this.state.isautoplay.toString(),
      duration: 250

    }
    return (
      <div className="body-wrapper">
        <h1>Hello, world!</h1>
        <Swiper
          {...opts}
          autoTime={1000}
          ads={[1, 2]}
          onChange={this.handleChange}
        >
          {this.state.swiperData.map((elem, idx) => {
            return <a key={`ads${idx}`} className="banner-item swiper-slide" onClick={() => { this.handleSudaAndJump(item.h5_link) }}>
              <img src={elem} alt='' />
            </a>
          })}
        </Swiper>
        <div>
          {
            this.state.flag ? <div>111</div> : <div>2222</div>
          }
        </div>
        <div>
          {[1, 2].map((item, idx) => {
            return (
              <div key={idx}>{item}</div>
            )
          })}
        </div>
      </div>
    );
  }
}

Test.propTypes = {

}

Test.defaultProps = {

};


export default Test;

