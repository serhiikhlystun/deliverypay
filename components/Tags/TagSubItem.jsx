import React from 'react';
import './Tags.sass';

const TagSubItem = ({ title, id, getSelectedSubCategory, selectedSubCategory }) => {
  return (
    <button
      id={id}
      onClick={e => getSelectedSubCategory(e)}
      className={`tags__item tags__item-title ${selectedSubCategory === id ? 'active' : ''}`}
    >
      {title}
    </button>
  );
};

export default TagSubItem;
