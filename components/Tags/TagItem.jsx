import React from 'react';
import './Tags.sass';

const TagItem = ({ title, id, getSelectedCategory, selectedCategory, inputSearchValue }) => {
  return (
    <button
      id={id}
      onClick={e => getSelectedCategory(e)}
      className={`tags__item tags__item-title ${selectedCategory === id && !inputSearchValue ? 'active' : null}`}
    >
      {title}
    </button>
  );
};

export default TagItem;
