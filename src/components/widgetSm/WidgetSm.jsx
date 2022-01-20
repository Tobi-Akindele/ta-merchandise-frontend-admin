import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { userRequest } from '../../requestMethods';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('/users?limit=true');
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, []);

  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Join Members</span>
      <ul className='widgetSmList'>
        {users.map((user) => (
          <li className='widgetSmListItem' key={user.id}>
            <img
              src={
                user.image ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=''
              className='widgetSmImg'
            />
            <div className='widgetSmUser'>
              <span className='widgetSmUsername'>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <button className='widgetSmButton'>
              <Visibility className='widgetSmIcon' />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
