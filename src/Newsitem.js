
import React, { Component } from 'react'

export  class Newsitem extends Component {


  render() {
      let {title,description,url,newsurl,author,date,source} = this.props;
      
    return (

      <>
        <div className="card" style={{ width: "18rem"}}>
          <img src={url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} ...</h5>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span>
            <p className="card-text">{description} ...</p>
            <p className="card-text"><small className="text-muted">Updated by {author} on {new Date(date).toLocaleString()} </small></p>
            <a href={newsurl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </>
    )
  }
}
 export default Newsitem