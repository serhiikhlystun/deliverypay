import React from 'react';
import './Tags.sass';
import Link from 'next/link';

const TagItem = ({ title, id, getSelectedCategory, selectedCategory, inputSearchValue, slug, page_url }) => {

  return (
    <Link
      href={`/${page_url}/${slug}`}
      id={id}
      onClick={(e) => getSelectedCategory(e)}
      className={`tags__item tags__item-title ${
        selectedCategory === id && !inputSearchValue ? 'active' : null
      }`}
    >
      {title}
    </Link>
  );
};

export default TagItem;
