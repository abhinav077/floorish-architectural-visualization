import { Box, Feather } from 'lucide-react'
import React from 'react'
import Button from './ui/Button';
import { useOutletContext } from 'react-router';

const Navbar = () => {

    const  {isSignedIn, userName, authError, signIn, signOut} = useOutletContext<AuthContext>();
    
    const handleAuthClick = async() => {
        if(isSignedIn) {
            try {
                await signOut();
            }
            catch(e){
                console.error(`Error signing out: ${e}`);
            }
            
            return;
        }

        try {
            await signIn();
        }
        catch(e){
            console.error(`Error signing in: ${e}`);
        }
    };

  return (
    <header className='navbar'>
        <nav className='inner'>

            <div className='left'>

                <div className='brand'>
                    <Feather className='logo'/>

                    <span className='name'>
                        Floorish
                    </span>
                </div>

                <ul className='links'>
                    <a href="#">Products</a>
                    <a href="#">Pricing</a>
                    <a href="#">Community</a>
                    <a href="#">Enterprise</a>
                </ul>
            </div>

            <div className='actions'>
                {isSignedIn ? (
                    <>
                        <span className='greeting'>
                            {userName ? `Hi, ${userName}` : "Signed In"}
                        </span>
                        <Button size='sm' onClick={handleAuthClick}>
                            Log Out
                        </Button>
                    </>                        
                ) : (
                    <>
                        <Button size='sm' onClick={handleAuthClick} variant='ghost'>
                            Log In
                        </Button>

                        <a href="/upload" className='cta'>Get Started</a>
                    </>
                )}
            </div>    

        </nav>

        {authError ? <p className='auth-error'>{authError}</p> : null}
    </header>
  )
}

export default Navbar
