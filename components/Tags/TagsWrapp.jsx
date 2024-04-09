import React from 'react';
import './Tags.sass';
import Search from '../Search/Search';
import TagItem from './TagItem';
import TagSubItem from './TagSubItem';

const TagsWrapp = ({
  categories,
  subcategories,
  getSelectedCategory,
  selectedCategory,
  getSelectedSubCategory,
  selectedSubCategory,
  getSearchInputValue,
  inputSearchValue,
  page_url
}) => {
  return (
    <section className="tags">
      <div className="container">
        <div className="tags__wrapp">
          <div className="tags__list">
            {categories.map((category, index) => (
              <TagItem
                key={category.id}
                slug={category.slug}
                title={category.category_name}
                id={category.id}
                getSelectedCategory={getSelectedCategory}
                selectedCategory={selectedCategory}
                inputSearchValue={inputSearchValue}
                page_url={page_url}
              />
            ))}
          </div>
          <Search getSearchInputValue={getSearchInputValue}/>
        </div>
        <div className="tags__list width-full">
          {subcategories.map((subcategory, index) => (
            <TagSubItem
              key={subcategory.id}
              title={subcategory.subcategory_name}
              id={subcategory.id}
              getSelectedSubCategory={getSelectedSubCategory}
              selectedSubCategory={selectedSubCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TagsWrapp;
