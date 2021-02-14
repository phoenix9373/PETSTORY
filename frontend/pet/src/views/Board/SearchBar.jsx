import React from 'react';

const SearchBar = ({
  results,
  keyword,
  updateField,
  onhandleInputChange,
  onhandleInputKeyDown,
}) => {
  // renders our results using the SearchPreview component
  const updateText = (text) => {
    updateField('keyword', text);
    updateField('results', []);
  };

  const cancelSearch = () => {
    updateField('keyword', '');
  };

  const renderResults = results.map(({ position, name, age }, index) => (
    <SearchPreview
      key={index}
      updateText={updateText}
      index={index}
      name={name}
    />
  ));
  return (
    <div className="auto">
      <button
        onClick={() => cancelSearch()}
        className={`cancel-btn ${keyword.length > 0 ? 'active' : 'inactive'}`}
      >
        clear!
      </button>
      <input
        className="search-bar"
        placeholder="Search"
        value={keyword}
        onChange={onhandleInputChange}
        placeholder="태그"
        onKeyDown={onhandleInputKeyDown}
        onChange={(e) => updateField('keyword', e.target.value)}
      />

      {results.length > 0 ? (
        <div className="search-results">{renderResults}</div>
      ) : null}
    </div>
  );
};

// stateless component to render preview results
const SearchPreview = ({ name, index, updateText }) => (
  <div
    onClick={() => updateText(name)}
    className={`search-preview ${index === 0 ? 'start' : ''}`}
  >
    <div className="first">
      <p className="name">{name}</p>
    </div>
  </div>
);

export default SearchBar;
