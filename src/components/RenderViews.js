import React from 'react';
import { useSelector } from 'react-redux';

import AdminView from './views/Admin';
import UserView from './views/UserView';
import SysAdminView from './views/SysAdmin';

const RenderViews = (props) => {
  // grab current user's role
  const role = useSelector((state) => state.session.role); 

  if (role === 'system admin') { return (  
    <div>
      <SysAdminView />
    </div>
    )
  }
  else if (role === 'admin') { return (
    <div>
      <AdminView />
    </div>
    )
  }
  else if (role === 'user') { return (
    <div>
      <UserView />
    </div>
    )
  }
};

export default RenderViews;