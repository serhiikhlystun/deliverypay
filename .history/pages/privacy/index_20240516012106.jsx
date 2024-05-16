

// export default function PrivacyPage () {

//     return (
//         <div className="container">This is privacy page!</div>
//     )
// }


import getData from '@/queries/getData';
import { SinglePageQuery } from '@/queries/SingleProductQueries';

export default function PrivacyPage({ title, content }) {
  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}

export const getServerSideProps = async ctx => {
    console.log('ad',ctx.query)
//   const { slug } = ctx.query;

//   const data = await getData(SinglePageQuery, 'pages', { page_slug: slug });

  return {
    props: {
        title: "Title"+ window.location.pathname, //data[0].title,
        content:"<div>daw</div>" //data[0].content,
    },
  };
};
