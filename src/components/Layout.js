import Head from "next/head";
import Link from "next/link";

function Layout({ children, title, description }) {
  return (
    <div className="layout-wrapper">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;900&display=swap"
          rel="stylesheet"
        ></link>
        <meta name="og:title" content={description} />
        <title>{title}</title>
      </Head>
      <nav className="container-page">
        <Link href="/">
          <a>Haker News clone</a>
        </Link>
      </nav>
      <main>{children}</main>

      <footer>
        <p>Footer</p>
      </footer>
      <style jsx>
        {`
          .container-page {
            margin-top: 60px;
            height: 40px;
            font-size: 20px;
            font-weight: 500;
            background-color: #ff6600;
          }
          .container-page a {
            color: black;
            padding: 1em;
            padding-top: 10px;
            display: block;
            font-size: 15px;
          }
        `}
      </style>
    </div>
  );
}

export default Layout;
