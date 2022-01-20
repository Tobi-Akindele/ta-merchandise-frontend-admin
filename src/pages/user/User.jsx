import { MailOutline, PermIdentity, Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './user.css';

export default function User() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === id)
  );

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
        <Link to='/newUser'>
          <button className='userAddButton'>Create</button>
        </Link>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowTop'>
            <img
              src={
                user.image ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=''
              className='userShowImg'
            />
            <div className='userShowTopTitle'>
              <span className='userShowUsername'>
                {user.firstName} {user.lastName}
              </span>
              {/* <span className='userShowUserTitle'>Software Engineer</span> */}
            </div>
          </div>
          <div className='userShowBottom'>
            <span className='userShowTitle'>Account Details</span>
            <div className='userShowInfo'>
              <PermIdentity className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.username}</span>
            </div>
            {/* <div className='userShowInfo'>
              <CalendarToday className='userShowIcon' />
              <span className='userShowInfoTitle'>10.12.1999</span>
            </div> */}
            <span className='userShowTitle'>Contact Details</span>
            {/* <div className='userShowInfo'>
              <PhoneAndroid className='userShowIcon' />
              <span className='userShowInfoTitle'>+1 123 456 67</span>
            </div> */}
            <div className='userShowInfo'>
              <MailOutline className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.email}</span>
            </div>
            {/* <div className='userShowInfo'>
              <LocationSearching className='userShowIcon' />
              <span className='userShowInfoTitle'>New York | USA</span>
            </div> */}
          </div>
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm'>
            <div className='userUpdateLeft'>
              <div className='userUpdateItem'>
                <label>Username</label>
                <input
                  name='username'
                  type='text'
                  placeholder={user.username}
                  className='userUpdateInput'
                />
              </div>
              <div className='userUpdateItem'>
                <label>First Name</label>
                <input
                  name='firstName'
                  type='text'
                  placeholder={user.firstName}
                  className='userUpdateInput'
                />
              </div>
              <div className='userUpdateItem'>
                <label>Last Name</label>
                <input
                  name='lastName'
                  type='text'
                  placeholder={user.lastName}
                  className='userUpdateInput'
                />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input
                  name='email'
                  type='text'
                  placeholder={user.email}
                  className='userUpdateInput'
                />
              </div>
            </div>
            <div className='userUpdateRight'>
              <div className='userUpdateUpload'>
                <img
                  className='userUpdateImg'
                  src={
                    user.image ||
                    'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                  }
                  alt=''
                />
                <label htmlFor='file'>
                  <Publish className='userUpdateIcon' />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} />
              </div>
              <button className='userUpdateButton'>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
