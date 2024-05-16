

// export default function PrivacyPage () {

//     return (
//         <div className="container">This is privacy page!</div>
//     )
// }
import './PageItem.sass';

import getData from '@/queries/getData';
import { SinglePageQuery } from '@/queries/SinglePageQueries';

export default function PrivacyPage({ title, content }) {
  return (
    <>
     
      <div class="container">
        <div class="page-item">
          <div class="page-item__content">
            <div class="page-item__title-inn">
              <div class="page-item__title-box">
                <h3 class="page-item__title">{title}</h3>
              </div>
            </div>
            {/* <p class="page-item__descr-title">Content:</p> */}
            <p class="page-item__descr-text page-unset" dangerouslySetInnerHTML={{ __html: content }}/>
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
