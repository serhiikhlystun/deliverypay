

// export default function PrivacyPage () {

//     return (
//         <div classNameName="container">This is privacy page!</div>
//     )
// }
import './PageItem.sass';

import getData from '@/queries/getData';
import { SinglePageQuery } from '@/queries/SinglePageQueries';

export default function PrivacyPage({ title, content }) {
  return (
    <>
     
      <div className="container">
        <div className="page-item">
          <div className="page-item__content">
            <div className="page-item__title-inn">
              <div className="page-item__title-box">
                <h3 className="page-item__title">{title}</h3>
              </div>
            </div>  
            {/* <p className="page-item__descr-title">Content:</p> */}
            <div className="page-unset" dangerouslySetInnerHTML={{ __html: content }}/>
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
            title: (data[0]) ? data[0].title : slug,
            content: (data[0]) ? data[0].content : "<p style='text-align: center;'>This EMPTY! Please create page with slug:<b>" + slug + "</b></p>",
        },
    };
};
