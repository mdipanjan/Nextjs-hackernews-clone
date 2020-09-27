import Link from "next/link";
import Error from "next/error";
import Layout from "../src/components/Layout";
import fetch from "isomorphic-fetch";

class Comments extends React.Component {
  static async getInitialProps({ req, res, query }) {
    // console.log(query.id);
    let id = query.id;
    let comments = [];

    try {
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/item/${id}`
      );
      comments = await response.json();
      console.log(comments, "============");
    } catch (error) {
      comments = [];
    }
    return { comments };
  }
  render() {
    let { comments } = this.props;
    if (!comments) {
      return <h5>No Stories Found</h5>;
    } else {
      return (
        <Layout
          title={comments.title}
          description="This is a practice clone of hacker news built using next.js"
        >
          <div className="container-page">
            <div className="news-wrap">
              <div className="name-trio-comments">
                <p className="comment-triangle">&#x25B2;</p>
                <div className="title-box">
                  <a className="title" href={"/"}>
                    {comments.title}
                  </a>
                  <Link href="/">
                    <a className="domain-name"> ({comments.domain})</a>
                  </Link>
                </div>
              </div>
              <div className="pointes-wrap ml-3">
                <p>{comments.points} points by</p> <p>{comments.user}</p>
                <p className="pl-1"> {comments.time_ago} |</p>
                <Link href={`/comments?id=${comments.id}`}>
                  <a className="comment">{comments.comments_count} comments</a>
                </Link>
              </div>
            </div>
            <div className="comments-section mt-5">
              {comments.comments.map((itm, indx) => {
                return (
                  <div className="">
                    <div className="comment-details-box">
                      <p className="comment-triangle">&#x25B2;</p>
                      <p className="comment-user-name">{itm.user}</p>
                      <p className="comment-user-time">{itm.time_ago}</p>
                    </div>
                    <p
                      key={indx}
                      className="comment-content"
                      dangerouslySetInnerHTML={{ __html: itm.content }}
                    />
                    {itm.comments.map((elem, ind) => {
                      return (
                        <div className="comments-section-inner">
                          <div className="comment-details-box">
                            <p className="comment-triangle">&#x25B2;</p>
                            <p className="comment-user-name">{elem.user}</p>
                            <p className="comment-user-time">{elem.time_ago}</p>
                          </div>
                          <p
                            key={ind}
                            className="comment-content"
                            dangerouslySetInnerHTML={{ __html: elem.content }}
                          />
                          {elem.comments !== undefined &&
                            elem.comments.length &&
                            elem.comments.map((item, indice) => {
                              return (
                                <div className="comments-section-inner2">
                                  <div className="comment-details-box">
                                    <p className="comment-triangle">&#x25B2;</p>
                                    <p className="comment-user-name">
                                      {item.user}
                                    </p>
                                    <p className="comment-user-time">
                                      {item.time_ago}
                                    </p>
                                  </div>
                                  <p
                                    key={ind}
                                    className="comment-content"
                                    dangerouslySetInnerHTML={{
                                      __html: item.content,
                                    }}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </Layout>
      );
    }
  }
}

export default Comments;
