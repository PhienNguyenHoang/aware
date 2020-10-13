import React from "react";
import {withRouter} from 'react-router-dom'
import './PageButton.css'

const PageButton = ({pageNum, location, tab}) => {
  let params = new URLSearchParams(location.search);
  const activePage = Number(params.get("page"));
  return (
    <a href={`/admin/dashboard/${tab}?page=${pageNum}`}>
      <div className={activePage === Number(pageNum)? "product-tab-page-button-checked" : "product-tab-page-button"}>{pageNum}</div>
    </a>
  );
};
export default withRouter(PageButton);
