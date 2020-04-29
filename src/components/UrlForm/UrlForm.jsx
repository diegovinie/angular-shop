import React, { useState } from 'react';
import './UrlForm.scss';

const UrlForm = props => {
  const { urlChange } = props;

  const [expanded, setExpanded] = useState(false);
  const [url, setUrl] = useState('');

  const onSend = () => {
    setExpanded(false);
    urlChange(url);
  }

  return (
    <div className="wrapper">
      <div className={`fill ${expanded ? 'expanded' : ''}`} >
        <button
          type="button"
          className="url-btn"
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            width="32px" height="16px"
            viewBox="0 0 32 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path d="M31.409,3.798 L24.406,10.8 C23.633,11.573 22.379,11.573 21.604,10.8 L20.202,9.398 L27.209,2.395 L21.605,-3.209 L14.603,3.798 L13.2,2.395 C12.426,1.622 12.426,0.367 13.2,-0.407 L20.203,-7.41 C20.98,-8.187 22.231,-8.187 23.005,-7.41 L31.41,0.996 C32.188,1.77 32.188,3.021 31.409,3.798 L31.409,3.798 Z M17.4,12.204 L10.397,19.211 L4.79,13.603 L11.8,6.6 L10.397,5.197 C9.62,4.423 8.369,4.423 7.595,5.197 L0.588,12.204 C-0.189,12.977 -0.189,14.228 0.588,15.002 L8.998,23.411 C9.772,24.185 11.022,24.185 11.8,23.411 L18.802,16.404 C19.575,15.631 19.575,14.381 18.802,13.602 L17.4,12.204 L17.4,12.204 Z M10.397,13.603 C11.171,14.381 12.425,14.381 13.199,13.603 L21.604,5.198 C22.378,4.424 22.378,3.17 21.604,2.396 C20.831,1.623 19.576,1.623 18.802,2.396 L10.396,10.802 C9.62,11.574 9.62,12.829 10.397,13.603 L10.397,13.603 Z" id="Shape" fill="#FFFFFF" transform="translate(15.999313, 7.999375) rotate(-315.000000) translate(-15.999313, -7.999375) "></path>
              </g>
          </svg>
        </button>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="JSON Archivo URL..."
          className="url-input"
        />
        <button
          type="button"
          onClick={onSend}
          className="send-btn"
        >
          <svg
            width="33px" height="33px"
            viewBox="0 0 33 33"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path d="M0.0377951225,31.4431498 L2.82385037,19.3824633 C2.93382623,18.8692426 3.37372969,18.4659978 3.92360902,18.3926805 L19.5035232,16.7797012 C19.9434267,16.7430425 19.9434267,16.0831873 19.5035232,16.0098701 L3.92360902,14.5068666 C3.37372969,14.470208 2.93382623,14.0669632 2.82385037,13.5537425 L0.0377951225,1.52971456 C-0.218815229,0.503273155 0.88094342,-0.339875143 1.83406758,0.136686938 L32.2973822,15.3866735 C33.2138477,15.8632356 33.2138477,17.182946 32.2973822,17.6595081 L1.83406758,32.8361774 C0.88094342,33.3127395 -0.218815229,32.4695912 0.0377951225,31.4431498 L0.0377951225,31.4431498 Z" id="Shape" fill="#FFFFFF"></path>
              </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UrlForm;
