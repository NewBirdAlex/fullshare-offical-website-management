import React, { Component } from 'react'
import NewsInList from '../../component/newsInList/newsInList'
import ModuleBanner from '../../component/moduleBanner/moudleBanner'
export default class Travel extends Component {
  render() {
    return (
      <div>
            <ModuleBanner type='6' ></ModuleBanner>
            <NewsInList type={6}></NewsInList>
      </div>
    )
  }
}
