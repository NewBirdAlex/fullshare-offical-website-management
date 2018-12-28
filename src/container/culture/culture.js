import React, { Component } from 'react'
import NewsInList from '../../component/newsInList/newsInList'

export default class Culture extends Component {
  componentDidMount(){

  }
  render() {
    return (
        <div>
            <NewsInList type={7}></NewsInList>
        </div>
    )
  }
}
