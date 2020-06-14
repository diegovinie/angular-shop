import React, { useState } from 'react';
import { ChangeEvent, KeyboardEvent } from 'shared/types';
import './SearchBar.scss';

export interface Props {
  searchChange: Function;
}

interface StaticMethods {
  reset?: () => void;
}

const SearchBar: React.FC<Props> & StaticMethods = props => {
  const { searchChange } = props;

  // const [showSearch, setShowSearch] = useState(true);
  const showSearch = true;
  const [animatePlop, setAnimatePlop] = useState(false);
  const [search, setSearch] = useState({search: '', change: 0});

  const handleChange = (e: ChangeEvent) => {
    const value = e.target.value;
    setSearch({search: e.target.value, change: value.length - search.search.length})
  };

  const onSearchKeyup = (e: KeyboardEvent) => {
    if (search.change !== 0) {
      searchChange(search);
    }
  };

  const plop = () => {
    setAnimatePlop(true);
    setTimeout(() => { setAnimatePlop(false); }, 110);
  };

  const reset = () => {
    setSearch({search: '', change: 0});
  };

  // allow to call reset from out the component
  SearchBar.reset = reset;

  return (
    <div id="react-SearchBar" className="wrapper">
      {showSearch && (
        <input
          type="text"
          placeholder="Buscar..."
          className="search-bar"
          value={search.search}
          onChange={handleChange}
          onKeyUp={onSearchKeyup}
          onKeyDown={plop}
        />
      )}
      <svg
        className={`${animatePlop ? 'animate-plop' : ''}`}
        width="16px" height="16px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.227028918">
          <g id="Desktop-Copy" transform="translate(-1056.000000, -215.000000)" fill="#000000">
            <path d="M1071.89258,230.111648 L1067.68711,225.905991 C1068.66447,224.751345 1069.25486,223.2587 1069.25486,221.627431 C1069.25486,217.967248 1066.28761,215 1062.62743,215 C1058.96725,215 1056,217.967248 1056,221.627431 C1056,225.287614 1058.96725,228.254863 1062.62743,228.254863 C1064.2587,228.254863 1065.75134,227.664469 1066.90599,226.686923 L1071.11165,230.89258 C1071.25487,231.035807 1071.48923,231.035807 1071.63227,230.89258 L1071.89258,230.63227 C1072.03581,230.489043 1072.03581,230.254874 1071.89258,230.111648 L1071.89258,230.111648 Z M1057.10457,221.627431 C1057.10457,218.582127 1059.58213,216.104572 1062.62743,216.104572 C1065.67274,216.104572 1068.15029,218.582127 1068.15029,221.627431 C1068.15029,224.672736 1065.67274,227.150291 1062.62743,227.150291 C1059.58213,227.150291 1057.10457,224.672736 1057.10457,221.627431 L1057.10457,221.627431 Z" id="Shape"></path>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default SearchBar;
