import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setUser } from '../utils/reducer';
import { useEffect } from 'react';
import { auth } from '../utils/FireBaseConfig';
import { useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    

    function logOut(){
        auth.signOut();
        dispatch(logoutUser());
        location.href = '/';
    }
    const {user} = useSelector((state)=> state);
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                dispatch(setUser({email: user.email, loggedIn: true}));
            }
        });
    });
    // console.log(user);
  return (
    <header>
      <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            {user["loggedIn"] ? (
                <>
                <li>
                    <button onClick={logOut}>Logout</button>
                </li>
                </>
            ) : (
                <li>
                <a href="/login">Login</a>
                </li>
            )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;