import '../SearchResultBar/SearchResultBar.sass';

const SearchResultBar = ({ count, inputSearchText }) => {

  return (
    <section className="search-result-bar__inner">
      <div className="container">
        <div className="search-result-bar">
          <h3 className="search-result-bar__title">
            search results for &ldquo;<b>{inputSearchText ? inputSearchText : ' '}</b>&ldquo;
          </h3>
          <p className="search-result-bar__quantity">
          &ldquo;<b>{count}</b>&ldquo; results
          </p>
        </div>
      </div>
    </section>
  );
};

export default SearchResultBar;
