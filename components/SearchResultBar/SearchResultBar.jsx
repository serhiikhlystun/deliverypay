import '../SearchResultBar/SearchResultBar.sass';

const SearchResultBar = ({ count, inputSearchText }) => {

  return (
    <section className="search-result-bar__inner">
      <div className="container">
        <div className="search-result-bar">
          <h3 className="search-result-bar__title">
            search results for "<b>{inputSearchText ? inputSearchText : ' '}</b>"
          </h3>
          <p className="search-result-bar__quantity">
            "<b>{count}</b>" results
          </p>
        </div>
      </div>
    </section>
  );
};

export default SearchResultBar;
