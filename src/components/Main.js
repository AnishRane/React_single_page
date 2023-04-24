// import React, { Component } from 'react';

// import XMLdata from '../assets/db.xml';
// import XMLParser from 'react-xml-parser';
// import axios from 'axios';

// class Main extends Component {
//   data = [];
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSelected: false,
//       activePost: {},
//       blogData: [],
//     };
//   }

//   getXmlData() {
//     let blogs = [];
//     axios
//       .get(XMLdata, {
//         'Content-Type': 'application/xml; charset=utf-8',
//       })
//       .then(function (response) {
//         let xmlToJson = new XMLParser().parseFromString(response.data);

//         xmlToJson.children.forEach((post) => {
//           let postData = {};
//           post.children.forEach((data) => {
//             postData[data.name] = data.value;
//           });
//           blogs.push(postData);
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     return blogs;
//   }

//   componentDidMount() {
//     this.data = this.getXmlData();
//     setInterval(() => {
//       this.setState({
//         blogData: this.data,
//       });
//     }, 2000);
//   }

//   render() {
//     var Handlechange = (e) => {
//       this.setState({
//         activePost: this.state.blogData.find((post) => {
//           return post.title === e.target.innerText;
//         }),
//       });
//       this.setState({ isSelected: !this.state.isSelected });
//       window.scrollTo(0, 0);
//     };
//     window.addEventListener('storage', () => {
//       this.setState({
//         isSelected: localStorage.getItem('isSelected') === 'true',
//       });
//     });
//     let ap = this.state.activePost;
//     const x = this.state.isSelected;

//     return (
//       <main className="p-4">
//         <div className="main-container">
//           {x ? (
//             <div className="post">
//               <h1 className="mb-4">{ap.title}</h1>
//               <p className="date">{ap.date}</p>
//               <p className="author">{ap.author}</p>
//               <img className="my-3 w-75 mx-auto" src={ap.img} />
//               <p>{ap.body}</p>
//             </div>
//           ) : (
//             <div className="post-list">
//               {this.state.blogData.length > 0 ? (
//                 this.state.blogData.map((data) => {
//                   return (
//                     <div className="card mb-5" key={data.date}>
//                       <div className="card-horizontal">
//                         <img
//                           className="card-img-top"
//                           src={data.image_path}
//                           alt="Card image cap"
//                         />
//                         <div className="card-body">
//                           <h1
//                             className="card-title mb-4"
//                             onClick={Handlechange}
//                           >
//                             {data.title}
//                           </h1>
//                           <p className="card-text">{data.summary}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div>Loading...</div>
//               )}
//             </div>
//           )}
//         </div>
//       </main>
//     );
//   }
// }
// export default Main;


import React, { Component } from 'react';
import XMLdata from '../assets/db.xml';
import XMLParser from 'react-xml-parser';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogData: [],
    };
  }

  componentDidMount() {
    this.getXmlData();
    // setInterval(() => {
    //   this.getXmlData();
    // }, 2000);
  }

  getXmlData() {
    axios
      .get(XMLdata, {
        'Content-Type': 'application/xml; charset=utf-8',
      })
      .then((response) => {
        const xmlToJson = new XMLParser().parseFromString(response.data);
        const blogData = xmlToJson.children.map((post) => {
          const postData = {};
          post.children.forEach((data) => {
            postData[data.name] = data.value;
          });
          postData.expanded = false; 
          return postData;
        });
        this.setState({ blogData });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleCardClick = (index) => {
    const { blogData } = this.state;
    const updatedBlogData = [...blogData];
    updatedBlogData[index].expanded = !updatedBlogData[index].expanded;
    this.setState({ blogData: updatedBlogData });
  };

  render() {
    const { blogData } = this.state;

    return (
      <main className="p-4">
        <div className="main-container">
          {blogData.length > 0 ? (
            blogData.map((data, index) => {
              return (
                <div className="card mb-5" key={data.date}>
                  <div className="card-horizontal" onClick={() => this.handleCardClick(index)}>
                    <img
                      className="card-img-top"
                      src={data.image_path}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h1 className="card-title mb-4">{data.title}</h1>
                      <p className="card-text">{data.summary}</p>
                    </div>
                  </div>
                  {data.expanded && (
                    <div className="post">
                      <h1 className="mb-4">{data.title}</h1>
                      <p className="date">{data.date}</p>
                      <p className="author">{data.author}</p>
                      <img className="my-3 w-75 mx-auto" src={data.img} alt="Post Image" />
                      <p>{data.body}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </main>
    );
  }
}

export default Main;
