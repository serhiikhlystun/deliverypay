import React from 'react';
import './Tags.sass';
import Link from 'next/link'

const TagSubItem = ({ title, id, getSelectedSubCategory, selectedSubCategory, category_slug, slug, page_url }) => {

  return (
    <Link
      id={id}
      href={`/${page_url}/${category_slug}/${slug}`}
      onClick={e => getSelectedSubCategory(e)}
      className={`tags__item tags__item-title ${selectedSubCategory === id ? 'active' : ''}`}
    >
      {title}
    </Link>
  );
};

export default TagSubItem;
