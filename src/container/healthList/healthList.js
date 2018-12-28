import React, { Component } from 'react'


import TopNews from '../../component/topNews/topNews'
import NewsInList from '../../component/newsInList/newsInList'
export default class NewsList extends Component {
  componentWillReceiveProps(){
    console.log(this.props)
  }
  render() {
    return (
      <div style={{margin:'10px'}}>
          <TopNews type={3}></TopNews>   
          <NewsInList type={3}></NewsInList>
      </div>
    )
  }
}
