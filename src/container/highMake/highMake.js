import React, { Component } from 'react'
import ModuleBanner from '../../component/moduleBanner/moudleBanner'
import NewsInList from '../../component/newsInList/newsInList'

export default class HighMake extends Component {
  render() {
    return (
        <div>
            <ModuleBanner type='8' ></ModuleBanner>
            <NewsInList type={8}></NewsInList>
            
        </div>
    )
  }
}
