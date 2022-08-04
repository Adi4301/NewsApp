import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country : "in",
    category : "technology",
    pageSize : 6

  }
  static propTypes={
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize:PropTypes.number
  }
  

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page : 1
    }

  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=538c5f891606426c9e952b04b969ebe2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState(
      {
        articles: parsedata.articles,
        totalResults : parsedata.totalResults,
        loading:false
      }
    )
  }
  
  handlePrevPage= async()=>{
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=538c5f891606426c9e952b04b969ebe2&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      page : this.state.page - 1,
      articles: parsedata.articles,
      loading:false
    })
    

  }

  handleNextPage=async ()=>{
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=538c5f891606426c9e952b04b969ebe2&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      page : this.state.page + 1,
      articles: parsedata.articles,
      loading:false
    })
  
    
    
  }
    
      

  
  render() {
    return (
      <>
        <div className="conatiner my-4 text-center display-3" >
          <h2 class="display-5">Top Headlines</h2>
        </div>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} url={element.urlToImage?element.urlToImage:"https://images.barrons.com/im-570906/social"} newsurl={element.url} author={!element.author?"Unknown":element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            
          })}

        </div>
        <div className="container d-flex justify-content-between my-3">
          <button type='button' disabled ={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevPage}>&laquo; Previous</button>
          <button type='button' disabled ={(this.state.page + 1) >  Math.ceil(this.state.totalResults/(this.state.pageSize))}className='btn btn-dark'onClick={this.handleNextPage}>Next &raquo;</button>
        </div>

      </>
    )
  }
}
export default News
