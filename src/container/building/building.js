import React, { Component } from 'react'
import NewsInList from '../../component/newsInList/newsInList'
import ModuleBanner from '../../component/moduleBanner/moudleBanner'
export default class Building extends Component {
  componentDidMount(){

  }
  render() {
    return (
        <div>
            <ModuleBanner type='4' ></ModuleBanner>
            <NewsInList type={4}></NewsInList>
        </div>
    )
  }
}
