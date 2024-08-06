import CardList from '../../components/Card/CardList';
import React, { useEffect, useState } from 'react';
import TagsWrapp from '../../components/Tags/TagsWrapp';
import SearchResultBar from '../../components/SearchResultBar/SearchResultBar';
import getData from '@/queries/getData';
import { useQuery } from 'react-query';
import { CategoriesQuery, FilteredSubcategoriesQuery } from '@/queries/ProductsQueries';
import {
  SaleDoubleFilteredProductsQuery,
  SaleFilteredProductsQuery,
  SaleProductsQuery,
  SaleSearchedProductsQuery,
} from '@/queries/SpecialQueries';

async function handleProductFiltering({ queryKey }) {
  if (queryKey[4]) {
    return await getData(SaleSearchedProductsQuery, 'products', {
      category: null,
      offset: queryKey[2],
      product_name: queryKey[4],
    });
  } else if (queryKey[1]) {
    if (queryKey[3]) {
      return await getData(SaleDoubleFilteredProductsQuery, 'products', {
        category: queryKey[1],
        offset: queryKey[2],
        subcategory: queryKey[3],
      });
    } else
      return await getData(SaleFilteredProductsQuery, 'products', {
        category: queryKey[1],
        offset: queryKey[2],
      });
  }

  return await getData(SaleProductsQuery, 'products', { offset: queryKey[2] });
}

async function handleSubcategoriesFiltering({ queryKey }) {
  if (queryKey[1]) {
    return await getData(FilteredSubcategoriesQuery, 'subcategories', {
      category: queryKey[1],
    });
  }

  return [];
}

const ProductsListPage = () => {
  const page_url = 'special';
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [offsetCount, setOffsetCount] = useState(0);

  const { data: products, isSuccess } = useQuery(
    ['products', selectedCategory, offsetCount, selectedSubCategory, inputSearchValue],
    handleProductFiltering
  );

  const { data: categories, isSuccess: categoriesSuccess } = useQuery(
    'categories',
    async () => await getData(CategoriesQuery, 'categories')
  );
  const { data: subcategories, isSuccess: subcategoriesSuccess } = useQuery(
    ['subcategories', selectedCategory],
    handleSubcategoriesFiltering
  );

  const getSelectedCategory = e => {
    setSelectedCategory(e.target.id);
    setSelectedSubCategory('');
    setOffsetCount(0);
    setInputSearchValue('');
  };

  const getSelectedSubCategory = e => {
    setSelectedSubCategory(e.target.id);
    setOffsetCount(0);
  };

  const getSearchInputValue = value => {
    setFilteredProducts([]);
    setInputSearchValue(value);
    value && setSelectedSubCategory('');
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
      {categoriesSuccess && subcategoriesSuccess && (
        <TagsWrapp
          categories={categories}
          subcategories={subcategories}
          getSelectedCategory={getSelectedCategory}
          selectedCategory={selectedCategory}
          getSelectedSubCategory={getSelectedSubCategory}
          selectedSubCategory={selectedSubCategory}
          getSearchInputValue={getSearchInputValue}
          inputSearchValue={inputSearchValue}
          page_url={page_url}
        />
      )}
      {filteredProducts && (
        <SearchResultBar count={filteredProducts.length} inputSearchText={inputSearchValue} />
      )}
      {filteredProducts && (
        <CardList page_url={page_url} products={filteredProducts} getLoadMoreProducts={getLoadMoreProducts} />
      )}
    </div>
  );
};

export default ProductsListPage;
