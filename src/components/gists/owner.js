import React from 'react';

const Owner = ({ owner }) => (
  <div>
    <a rel="noreferrer" target="_blank" href={ owner?.avatar_link }>
        <img width={'100%'} src={ owner.avatar_url } alt={ owner?.login } />
    </a>
    <p>
      <a rel="noreferrer" target="_blank" href={ owner?.html_url }>{ owner?.login }</a>
    </p>
  </div>
)

export const MemoizedOwner = React.memo(Owner);
