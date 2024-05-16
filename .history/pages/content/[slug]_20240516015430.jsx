

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
    {/* <section> */}
      {/* <div class="container"> */}
      {/* <div class="product-item">
        <div className="product-item__content">
          <div className="product-item__title-box">
          <h3 className="product-item__title">{title}</h3>

          </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        </div> */}
        {/* <div class="product-item">
        <div class="product-item__content">
          <div class="product-item__title-inn">
            <div class="product-item__title-box">
              <h3 class="product-item__title">Slug Mug</h3>
            </div>
          </div>
              <p class="product-item__descr-title">Description</p>
        </div>
      </div>
      </div>
      </section> */}
      <section><div class="container"><div class="product-item"><div class="product-item__content"><div class="product-item__title-inn"><div class="product-item__title-box"><h3 class="product-item__title">Slug Mug</h3></div></div><p class="product-item__descr-title">Description</p></div></div></div></section>

      
      
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
