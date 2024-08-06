import CardList from '../../components/Card/CardList';
import React, { useEffect, useState } from 'react';
import TagsWrapp from '../../components/Tags/TagsWrapp';
import SearchResultBar from '../../components/SearchResultBar/SearchResultBar';
import getData from '@/queries/getData';
import { useQuery } from 'react-query';
import { ProductsQuery, CategoriesQuery, SearchedProductsQuery } from '@/queries/ProductsQueries';

async function handleProductFiltering({ queryKey }) {
  if (queryKey[2]) {
    return await getData(SearchedProductsQuery, 'products', {
      category: null,
      status:"published",
      offset: queryKey[1],
      product_name: queryKey[2],
    });
  }

  return await getData(ProductsQuery, 'products', { offset: queryKey[1], status:"published" });
}

const ProductsListPage = () => {
  const page_url = 'products';
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState();
  const [offsetCount, setOffsetCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();

  const { data: products, isSuccess } = useQuery(
    ['products', offsetCount, inputSearchValue],
    handleProductFiltering
  );

  const { data: categories, isSuccess: categoriesSuccess } = useQuery(
    'categories',
    async () => await getData(CategoriesQuery, 'categories')
  );

  const getSelectedCategory = e => {
    setSelectedCategory(e.target.id);
    setOffsetCount(0);
    setInputSearchValue('');
  };

  const getSearchInputValue = value => {
    setFilteredProducts([]);
    setInputSearchValue(value);
    setOffsetCount(0);
  };

  const getLoadMoreProducts = () => {
    setOffsetCount(offsetCount + 20);
  };

  useEffect(() => {
    if (!offsetCount) {
      isSuccess && setFilteredProducts(products);
    } else {
      isSuccess && setFilteredProducts([...filteredProducts, ...products]);
    }
  }, [products]);

  return (
    <div>
      {categoriesSuccess && (
        <TagsWrapp
          categories={categories}
          getSearchInputValue={getSearchInputValue}
          inputSearchValue={inputSearchValue}
          getSelectedCategory={getSelectedCategory}
          subcategories={[]}
          page_url={page_url}
        />
      )}
      {isSuccess && (
        <SearchResultBar
          count={filteredProducts ? filteredProducts.length : null}
          inputSearchText={inputSearchValue}
        />
      )}
      <CardList page_url={page_url} products={filteredProducts} getLoadMoreProducts={getLoadMoreProducts} />
    </div>
  );
};

export default ProductsListPage;
