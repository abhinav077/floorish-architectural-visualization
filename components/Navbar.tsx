import { Box, Feather } from 'lucide-react'
import React from 'react'
import Button from './ui/Button';

const Navbar = () => {

    const isSignedIn = false;
    const username = "abhi"
    const handleAuthClick = async() => {};

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
                            {username ? `Hi, ${username}` : "Signed In"}
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
    </header>
  )
}

export default Navbar