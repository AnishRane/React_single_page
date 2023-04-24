import React, { Component } from 'react';
import $ from 'jquery';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  fetchArticles() {
    console.log(process.env.REACT_APP_API_KEY)
    $.ajax({
      url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY}`,
      method: "GET",
      dataType: "json",
      success: (result) => {
        this.setState({
          isLoaded: true,
          items: this.shuffleArray(result.articles).slice(Math.max(this.shuffleArray(result.articles).length - 5, 0))
        });
      },
      error: (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    });
  }
  
  componentDidMount() {
    this.fetchArticles();
    setInterval(() => {
      this.fetchArticles();
    }, 60000);
  }

  render() {
    var Handlechange = (e) => {
      window.localStorage.setItem("isSelected", "false");
      window.dispatchEvent(new Event("storage"));
    }
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <nav className='pt-4'>
          <a className='btn btn-primary mb-2' onClick={Handlechange}>Homepage</a>
          {items.map(item => (
            <div className="card mb-2" key={item.author}>
              <img className="card-img-top" src={item.urlToImage} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-subtitle">{item.author}</p>
                <p className="card-text">{item.des}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">See Full Article</a>
              </div>
            </div>
          ))}
        </nav>
      );
    }
  }
}

export default Nav;

