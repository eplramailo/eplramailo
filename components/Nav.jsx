import React from 'react'
import styles from '../styles/Nav.module.scss';
import {GiHamburgerMenu} from 'react-icons/gi'
import Link from 'next/link'

export default function Nav() {

  function toggle() {
    let x=document.querySelector('.linkss');
    let y=document.querySelector('.headerr');
    x.classList.toggle('display');
    y.classList.toggle('header-top');

  
}


    return (
      <nav className={styles.nav}>
<div className='navv'>

          <div className={styles.logo}>
        <img src='/logo.png' alt='EPL RAMAILO' />
          </div>

       
<div className={styles.links}>
  <div className='linkss'>
<Link href='/news'><a >News</a></Link>
<Link href='/blogs'><a >Blogs</a></Link>
<Link href='/products'><a >Products</a></Link>
<br/>
{/* <Link href='/products'><a >Products</a></Link> */}
</div>
</div>
<div className={styles.toggle}>
<span onClick={()=>toggle()}><GiHamburgerMenu/></span>
</div>
        

          </div>

      </nav>
    )
}
