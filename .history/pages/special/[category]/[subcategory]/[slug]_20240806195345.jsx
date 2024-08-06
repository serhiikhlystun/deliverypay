import getData from '@/queries/getData';
import { SingleProductQuery } from '@/queries/SingleProductQueries';
import ProductItem from '@/components/ProductItem/ProductItem';
import Special from '@/components/Special/Special';
import { SaleProductsQuery } from '@/queries/ProductsQueries';

export default function ProductPage({ product, products }) {
  return (
    <>
      <ProductItem product={product} />
      <Special products={products} />
    </>
  );
}

export const getServerSideProps = async ctx => {
  const { slug } = ctx.query;

  const data = await getData(SingleProductQuery, 'products', { product_slug: slug });
  const products = await getData(SaleProductsQuery, 'products',{status:"published"});

  return {
    props: {
      product: data[0],
      products: products,
    },
  };
};
