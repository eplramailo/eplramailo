import Head from "next/head";
import Link from "next/link";
import { createClient } from 'contentful';


const client = createClient({
  space:process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken:process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,

});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: "blogpost",
  });

  return {
    props: {
      articles: data.items,
    },
    revalidate: 50,
  };
}

export default function Home({ articles }) {


  return (
    <div className='blog-list'>
      <Head>
        <title>EPL Blogs</title>
    
      </Head>

      <main>
        <ul>
          {articles.map((article) => (
            <li key={article.sys.id}>
              <Link href={"/blogs/" + article.fields.slug}>
                <a>{article.fields.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>



      <style jsx>{`
        .blog-list {
         font-size:25px;
         width:80%;
         margin:auto;
        }
        .blog-list ul {
          list-style:none;
          font-size:35px;
          color:blue;
        }
      `}</style>

    </div>
  );
}
