'use client';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Categories from '../components/Categories/Categories';
import Special from '@/components/Special/Special';
import Newsletter from '@/components/Newsletter/Newsletter';
import AgePopup from '@/components/Popups/AgePopup';
import getData from '@/queries/getData';
import { CategoriesQuery, SaleProductsQuery } from '@/queries/ProductsQueries';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [isAgePopupOpen, setIsAgePopupOpen] = useState(true);
  const { data: products, isSuccess } = useQuery(
    'products',
    async () => await getData(SaleProductsQuery, 'products')
  );
  const { data: categories, isSuccess: categoriesSuccess } = useQuery(
    'categories',
    async () => await getData(CategoriesQuery, 'categories')
  );

  const handleCloseAgePopup = () => {
    setIsAgePopupOpen(false);
  };

  return (
    <>
      {categoriesSuccess && <Categories categories={categories} />}
      {isSuccess && <Special products={products} />}
      <Newsletter />
      {isAgePopupOpen && <AgePopup onClose={handleCloseAgePopup} />}
    </>
  );
}
