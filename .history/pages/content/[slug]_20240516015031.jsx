

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
      <div class="product-item">
        <div className="product-item__content">
          <div className="product-item__title-box">
          <h3 className="product-item__title">{title}</h3>

          </div>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
    const {slug} = ctx.query;
    // Call your function to search for the page in the database using the slug
    const data = await getData(SinglePageQuery, 'pages', { page_slug: slug });
    return {
        props: {
            title: (data[0]) ? data[0].title : "Empty",
            content: (data[0]) ? data[0].content : "Create page with slug:" + slug,
        },
    };
};
