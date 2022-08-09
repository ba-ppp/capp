import { css } from '@emotion/react';

export const uploadCustomStyles = css`
  button:hover,
  .btn-primary:hover {
    color: unset;
  }

  .uppy-Dashboard-browse:hover,
  .uppy-DashboardContent-back,
  .uppy-StatusBar-actionBtn,
  .uppy-DashboardContent-addMore,
  .uppy-DashboardContent-save {
    cursor: pointer;
    color: rgba(34, 117, 215, 0.9) !important;
    background: none !important;
    box-shadow: none !important;

    &:focus, &:active {
      background: #eceef2 !important;
    }
  }

  .uppy-c-btn-primary {
    &:hover {
      background-color: #2275d7 !important;
      color: #fff !important;
    }
  }

  .uppy-DashboardTab-btn {
    &:hover,
    &:focus,
    &:active {
      color: #525252 !important;
      background: #eceef2 !important;
    }
  }

  .uppy-ProviderBrowser-searchInput {
    padding-left: 35px !important;
  }
  
  .uppy-ProviderBrowser-searchIcon {
    top: 4px !important;
  }

  .uppy-StatusBar-actionCircleBtn {
    &:hover {
      background: unset;
    }
  }

  .uppy-ProviderBrowser-header .uppy-u-reset,
  .uppy-ProviderBrowserItem .uppy-u-reset {
    :hover {
      color: #1b5dab !important;
      background: transparent;
      box-shadow: none;
      opacity: 1;
    }
  }
`;
