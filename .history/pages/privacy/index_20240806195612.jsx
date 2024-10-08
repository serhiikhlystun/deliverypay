

// export default function PrivacyPage () {

//     return (
//         <div className="container">This is privacy page!</div>
//     )
// }


import getData from '@/queries/getData';
import { SinglePageQuery } from '@/queries/SinglePageQueries';

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
export const getServerSideProps = async (ctx) => {
    const slug  = "privacy"
    // Call your function to search for the page in the database using the slug
    const data = await getData(SinglePageQuery, 'pages', { page_slug: slug,status:"published" });
    console.log("DAAATATAA",data);
    return {
        props: {
            title: data[0].title,
            content: data[0].content,
        },
    };
};
