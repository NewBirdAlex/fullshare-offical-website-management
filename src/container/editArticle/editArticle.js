import React, { Component } from 'react'
import {Layout,Form,Input,DatePicker,Button,Message,MessageBox,Switch} from 'element-react'
// import Editor from 'react-umeditor'
import Editor from '../../component/editor/editor';
import axios from '../../util/axios'
import config from '../../util/config'
import UpLoadImg from '../../component/upLoadImg/upLoadImg'
export default class EditArticle extends Component {
    state = {
        addArticle:false,
        articleType:null,
        switchStatus:false,
        content: "",
        article:null,
        articleCover:'',
        labelPosition: 'right',
        dialogImageUrl: '',
        dialogVisible: false,
        form: {
          title: '',
          enghlishtitle: '',
          date1:new Date(),
          articleSummaryCn:null
        },
        editors:[
            {
                icons:this.getIcons(),
                plugins:this.getPlugins(),
                title:'中文内容',
                content:''
            },{
                icons:this.getIcons(),
                plugins:this.getPlugins(),
                title:'英文内容',
                content:''
            }
        ]

    }
    componentWillMount(){
        if(this.props.match.params.id){
            this.getArticle(this.props.match.params.id);
        }else if(localStorage.getItem('addArticle')){
            // 新增文章
            this.setState({
                addArticle:true,
                articleType:localStorage.getItem('addArticle')
            })
            if(localStorage.getItem('addArticle')==='3'){
                this.setState({
                    switchStatus:true
                })
            }
        }
    }

    getArticle(id){
        axios.post('/article/getArticle',{
            articleMainId:id
        }).then(res=>{
            // console.log(res)
            if(res.code!==200){
                MessageBox.alert('系统错误')
                return
            }
            if(res.data.length===0){
                MessageBox.alert('文章内容出错')
                return
            }
            let arr = this.state.editors;
            if(res.data[0]) arr[0].content = res.data[0].articleContent;
            if(res.data[1]) arr[1].content = res.data[1].articleContent;
            this.setState({
                article:res.data,
                articleCover:res.data[0].articleCover,
                switchStatus:res.data[0].visionStatus===1?true:false,
                form: {
                    title: res.data[0].articleTitle,
                    articleSummaryCn:res.data[0].articleSummary,
                    enghlishtitle: res.data[1]?res.data[1].articleTitle:'',
                    date1:new Date(res.data[0].articleTime)
                },
                editors:arr
            })
            console.log('end')
        })
    }
    imgChange=(url)=>{
        // console.log(url)
        this.setState({
            articleCover: url
        })
    }
    onPositionChange(value) {
        this.setState({ labelPosition: value });
    }
    
    onChange(key, value) {
        this.setState({
            form: Object.assign(this.state.form, { [key]: value })
        });
    }
   
    // 编辑器
    handleChange(content,index){
        // console.log('rich text:', content);
        let arr = this.state.editors;
        arr[index].content = content;
		this.setState({
			editors: arr
		})
	}
	getIcons(){
		var icons = [
			"source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
			"paragraph fontfamily fontsize | superscript subscript | ",
			"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
			"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
			"horizontal date time  | image emotion spechars | inserttable"
		]
		return icons;
	}
	getPlugins(){
		return {
			"image": { 
				"uploader": { 
					"name":"file", 
                    "url": config.path+"/common/2.0.0/upload/file" ,
                    filter:(res)=>res.data
				} 
			} 
		}
    }
    setSwitch = (value)=>{
        console.log(value)
        if(this.state.addArticle){
            this.setState({
                switchStatus:value
            })
        }else{
            this.setState({
                switchStatus:value,
                article:[
                    {...this.state.article[0],visionStatus:value?1:0},
                    {...this.state.article[1],visionStatus:value?1:0}
                ]
            })
        }
        
    }
    subdata=()=>{
        let url = null;
        let params = null;
        if(this.state.addArticle){
            // 新增文章
            url = '/article/createArticle';
            params = {
                "articleContentCn": this.state.editors[0].content,
                "articleContentEn": this.state.editors[1].content,
                "articleCover": this.state.articleCover || (this.state.article && this.state.article[0] && this.state.article[0].articleCover),
                "articleTime": this.state.form.date1,
                "articleSummaryCn":this.state.form.articleSummaryCn,
                "articleTitleCn": this.state.form.title,
                "articleTitleEn": this.state.form.enghlishtitle,
                "articleType": this.state.articleType,
                "visionStatus":this.state.switchStatus?1:0
            }
        }else{
            //修改文章
            url = '/article/editArticle';
            params = {
                "articleContentCn": this.state.editors[0].content,
                "articleContentEn": this.state.editors[1].content,
                "articleCover": this.state.articleCover || (this.state.article && this.state.article[0] && this.state.article[0].articleCover),
                "articleTime": this.state.form.date1,
                "articleSummaryCn":this.state.form.articleSummaryCn,
                "articleTitleCn": this.state.form.title,
                "articleTitleEn": this.state.form.enghlishtitle,
                "articleType": this.state.article[0].articleType,
                "articleMainId":this.state.article[0].articleMainId,
                "visionStatus":this.state.switchStatus?1:0
            }
        }
        axios.post(url,params).then(res=>{
            // console.log(res)
            if(res.code===200){
                if(this.state.addArticle){
                    Message('创建文章成功')
                    this.props.history.go(-1)
                }else{
                    Message('修改成功')

                }
            }
        })
    }
    render() {
        // const { dialogImageUrl, dialogVisible } = this.state;
        // var icons = this.getIcons();
        // var plugins = this.getPlugins();
        // let editors = [{icons,plugins,title:'中文内容'},{icons,plugins,title:'英文内容'}];
        let _this = this;
        if(!this.state.addArticle&&!this.state.article) return null;
        return (
        <div>
            <h2>编辑文章</h2>
            <Layout.Row>
                <Layout.Col span="18" offset = "1">
                    <Form labelPosition={this.state.labelPosition} labelWidth="100" model={this.state.form} className="demo-form-stacked">
                        <Form.Item label="日期">
                            <DatePicker
                            value={this.state.form.date1}
                            placeholder="选择日期"
                            onChange={this.onChange.bind(this, 'date1')}
                            />
                        </Form.Item>
                        <Form.Item label="中文标题">
                            <Input value={this.state.form.title} onChange={this.onChange.bind(this, 'title')}></Input>
                        </Form.Item>
                        <Form.Item label="英文标题">
                            <Input value={this.state.form.enghlishtitle} onChange={this.onChange.bind(this, 'enghlishtitle')}></Input>
                        </Form.Item>
                        <Form.Item label="文章封面图">
                            {/* {this.state.articleCover===""?<img src={this.state.article[0].articleCover} style={{maxWidth:'500px'}} alt=''/>:''} */}
                            <UpLoadImg onChange={this.imgChange} defaultImg={this.state.articleCover}></UpLoadImg>
                        </Form.Item>
                        <Form.Item label="">
                            {/* 两种情况 新增  修改 */}
                            {this.state.addArticle?<div>{this.props.match.params.type==='2'||this.props.match.params.type==='3'?'建议尺寸：528*320':'建议尺寸：458*275'}</div>:<div>{this.state.article[0].articleType==='2'||this.state.article[0].articleType==='3'?'建议尺寸：528*250':'建议尺寸:458*275'}</div>}

                        </Form.Item>
                        <Form.Item label="文章摘要">
                            <Input type='textarea' placeholder='输入文章摘要' value={this.state.form.articleSummaryCn} onChange={this.onChange.bind(this, 'articleSummaryCn')}></Input>
                            <div className='grayColor'>文字字数限制在148内</div>
                        </Form.Item>
                        <Form.Item label="插入封面图片">
                            <div>
                                <Switch
                                    value={this.state.switchStatus}
                                    onChange={(value)=>{this.setSwitch(value)}}
                                    onText="ON"
                                    offText="OFF">
                                </Switch>
                            </div>
                        </Form.Item>
                    </Form>
                </Layout.Col>
            </Layout.Row>
            {
                this.state.editors.map((ele,pos)=>{
                    return (
                        <Layout.Row key={pos}>
                            <Layout.Col span='18' offset='1'>
                                <h2 className='cfbtn'>{ele.title}
                                {/* {(this.state.article[0].articleType===4||this.state.article[0].articleType===5||this.state.article[0].articleType===6)?'(字数限制176以内)':''} */}
                                </h2>
                                <p className='gray'>插入图片宽度建议大于1030像素</p>

                                <Editor ref="editor" 
                                    icons={ele.icons} 
                                    value={ele['content']} 
                                    defaultValue="在这编辑文章" 
                                    onChange={function(e){
                                        _this.handleChange(e,pos)
                                    }} 
                                    plugins={ele.plugins} />

                            </Layout.Col>
                        </Layout.Row>
                    )
                })
            }
            
            <Layout.Row>
                <Layout.Col span="18" offset='1' style={{'textAlign':'center'}}>
                    
                    <Button type="primary" className='cfbtn' onClick={()=>{this.subdata()}}>保存</Button>
                </Layout.Col>
            </Layout.Row>
        </div>
        )
    }
}
