import React, { Component } from 'react'
import Head from '../../component/head/head'
import {Layout} from 'element-react'
// import NavBar from '../../component/navBar/navBar'
import NavBar from '../../component/navBar/navMenu'
import WebsitePath from '../../component/websitePath/websitePath'
import {Route,Switch} from 'react-router-dom'
import Setting from '../setting/setting'
import Banner from '../banner/banner'
import AddArticle from '../addArticle/addArticle'
import NewsList from '../newsList/newsList'
import HealthList from '../healthList/healthList'
import EditArticle from '../editArticle/editArticle'
import Building from '../building/building'
import Health from '../health/health'
import Travel from '../travel/travel'
import Culture from '../culture/culture'
import HighMake from '../highMake/highMake'
import AddHighMake from '../addArticle/addHighMake'
import EditFsCulture from '../editFsCulture/editFsCulture'
import AboutBanner from '../about/banner'
export default class Home extends Component {

  componentDidMount(){
    
    if(!localStorage.getItem('user')) this.props.history.push('/login')
  
  }
  render() {
    return (
      <div>
        
        <Head></Head>
        <Layout.Row style={{'position':'relative'}}>
          <Layout.Col span="4">
            <div className='leftspace'></div>
            <NavBar></NavBar>
          </Layout.Col>
          <Layout.Col span="20">
            <WebsitePath></WebsitePath>
            <Switch>
              <Route path="/home" exact component = {Banner}></Route>
              <Route path="/home/culture"  component = {Culture}></Route>
              <Route path="/home/setting"  component = {Setting}></Route>
              <Route path="/home/banner"  component = {Banner}></Route>
              <Route path="/home/addArticle/:type"  component = {AddArticle}></Route>
              <Route path="/home/addHighMake"  component = {AddHighMake}></Route>
              <Route path="/home/newslist"  component = {NewsList}></Route>
              <Route path="/home/building"  component = {Building}></Route>
              <Route path="/home/health"  component = {Health}></Route>
              <Route path="/home/travel"  component = {Travel}></Route>
              <Route path="/home/healthlist"  component = {HealthList}></Route>
              <Route path="/home/highMake"  component = {HighMake}></Route>
              <Route path="/home/editFsCulture"  component = {EditFsCulture}></Route>
              <Route path="/home/editArticle/:id?"  component = {EditArticle}></Route>
              <Route path="/home/about/banner"  component = {AboutBanner}></Route>
            </Switch>
            
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}
