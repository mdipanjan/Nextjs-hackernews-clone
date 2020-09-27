import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import Layout from "../src/components/Layout";
import fetch from "isomorphic-fetch";

class Home extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let data;
    let page;
    // console.log(query);
    try {
      page = Number(query.page) || 1;
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      data = await response.json();
      console.log(data);
    } catch (error) {
      data = [];
    }
    return { data, page };
  }
  render() {
    let { data, page } = this.props;

    if (data.length === 0) {
      return <Error statusCode={503} />;
    } else {
      return (
        <Layout
          title="Hacker News Clone"
          description="This is a practice clone of hacker news built using next.js"
        >
          <div className="container-page">
            {data.map((res, indx) => {
              return (
                <div key={res.id} className="news-wrap">
                  <h6 className="name-trio">
                    {indx + 1 + ". "}&#x25B2;
                    <a className="title" href={res.url}>
                      {res.title}
                    </a>
                  </h6>
                  <div className="pointes-wrap ml-3">
                    <p>{res.points} points by</p> <p>{res.user}</p>
                    <p className="pl-1"> {res.time_ago} |</p>
                    <Link href={`/comments?id=${res.id}`}>
                      <a className="comment">{res.comments_count} comments</a>
                    </Link>
                  </div>
                </div>
              );
            })}
            <Link href={`/?page=${page + 1}`}>
              <a className="more">More</a>
            </Link>
          </div>
        </Layout>
      );
    }
  }
}

export default Home;
