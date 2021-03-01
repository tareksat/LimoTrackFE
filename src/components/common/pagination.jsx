import React from 'react';
import _ from 'lodash';

const Paginate = (props) => {
    const pages = _.range(1, props.pages+1);
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {pages.map(page => {
                    return(
                        <li key={page}
                            className={props.activePage===page? 'page-item active': 'page-item'}>
                            <a className="page-link"
                               onClick={() => props.getActivePageNumber(page)}
                               style={{cursor: 'pointer'}}
                            >
                                {page}
                            </a>
                        </li>
                    )
                })}

            </ul>
        </nav>

    )
}

export default Paginate;