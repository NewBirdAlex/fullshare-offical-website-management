import React, { Component } from 'react'
import NewsInList from '../../component/newsInList/newsInList'
import ModuleBanner from '../../component/moduleBanner/moudleBanner'
export default class Health extends Component {
  render() {
    return (
      <div>
            <ModuleBanner type='5' ></ModuleBanner>
            <NewsInList type={5}></NewsInList>
      </div>
    )
  }
}
