<template>
      <div class="body-wrapper">
        <h1>Hello, world!</h1>
        <swiper {...opts} autoTime={1000} ads={[1, 2]} onChange={this.handleChange}>
          {this.swiperData.map((elem, idx) => {
            return (
              <a
                key={`ads${idx}`}
                class="banner-item swiper-slide"
                onClick={this.handleSudaAndJump.bind(item.h5_link)}
              >
                <img src={elem} alt="" />
              </a>
            )
          })}
        </swiper>
        <div>{this.flag ? <div>111</div> : <div>2222</div>}</div>
        <div>
          {[1, 2].map((item, idx) => {
            return <div key={idx}>{item}</div>
          })}
        </div>
      </div>
    </template>