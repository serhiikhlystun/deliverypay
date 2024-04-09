import CardList from '@/components/Card/CardList';
import SearchResultBar from '@/components/SearchResultBar/SearchResultBar';
import getData from '@/queries/getData';
import {
  FilteredByCategorySlugProductsQuery,
  CategoriesQuery,
  FilteredSubcategoriesQuery,
  DoubleFilteredProductsQuery,
  SearchedProductsQuery,
  FilteredProductsQuery,
  ProductsQuery
} from '@/queries/ProductsQueries';
import { useQuery } from 'react-query';
import React, { useState, useEffect } from 'react';
import TagsWrapp from '@/components/Tags/TagsWrapp';

async function handleProductFiltering({ queryKey }) {
  if (queryKey[4]) {
    return await getData(SearchedProductsQuery, 'products', {
      category: null,
      offset: queryKey[2],
      product_name: queryKey[4],
    });
  } else if (queryKey[1]) {
    if (queryKey[3]) {
      return await getData(DoubleFilteredProductsQuery, 'products', {
        category: queryKey[1],
        offset: queryKey[2],
        subcategory: queryKey[3],
      });
    } else
      return await getData(FilteredProductsQuery, 'products', {
        category: queryKey[1],
        offset: queryKey[2],
      });
  }

//   return await getData(ProductsQuery, 'products', { offset: queryKey[2] });
}

async function handleSubcategoriesFiltering({ queryKey }) {
  if (queryKey[1]) {
    return await getData(FilteredSubcategoriesQuery, 'subcategories', {
      category: queryKey[1],
    });
  }
}

export default function CategoryPage({products}) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [showProducts, setShowProducts] = useState();
  const [offsetCount, setOffsetCount] = useState(0);

  const { data: filteredProducts, isSuccess } = useQuery(
    ['products', selectedCategory, offsetCount, selectedSubCategory, inputSearchValue],
    handleProductFiltering
  );

  const { data: categories, isSuccess: categoriesSuccess } = useQuery(
    'categories',
    async () => await getData(CategoriesQuery, 'categories')
  );

  const { data: subcategories } = useQuery(['subcategories', selectedCategory], handleSubcategoriesFiltering);

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
    setShowProducts([]);
    setInputSearchValue(value);
    value && setSelectedSubCategory('');
    setOffsetCount(0);
  };

  const getLoadMoreProducts = () => {
    setOffsetCount(offsetCount + 20);
  };

  useEffect(() => {
    if (!offsetCount) {
      isSuccess && setShowProducts(filteredProducts);
    } else if(filteredProducts) {
      isSuccess && setShowProducts([...showProducts, ...filteredProducts]);
    }
  }, [filteredProducts]);

  return (
    <div>
      <TagsWrapp
        categories={categoriesSuccess ? categories : []}
        subcategories={subcategories ? subcategories : []}
        getSelectedCategory={getSelectedCategory}
        selectedCategory={selectedCategory}
        getSelectedSubCategory={getSelectedSubCategory}
        selectedSubCategory={selectedSubCategory}
        getSearchInputValue={getSearchInputValue}
        inputSearchValue={inputSearchValue}
      />
      <SearchResultBar count={showProducts ? showProducts.length : products.length} />
      <CardList products={showProducts ? showProducts : products} getLoadMoreProducts={getLoadMoreProducts} />
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const { category } = ctx.query;

  const data = await getData(FilteredByCategorySlugProductsQuery, 'products', { category_slug: category });

  return {
    props: {
      products: data,
    },
  };
};
