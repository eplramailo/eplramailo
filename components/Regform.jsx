import React, { useState } from 'react'
import styles from '../styles/Regform.module.scss'

import firebase from '../firebase/Firebase'

export default function Register() {


    const db=firebase.firestore();
    const storage=firebase.storage();



const [fname,setFname]=useState('');
const [lname,setLname]=useState('');
const [phone,setPhone]=useState('');
const [email,setEmail]=useState('');
const [country,setCountry]=useState('');
const [district,setDistrict]=useState('');


const [loader, setLoader]=useState(false);
const [error, setError]=useState(' ');
const types=['image/png', 'image/jpeg']
const [photo, setImg]=useState(null);


const ImgHandler=(e)=> {



    let selectedFile=e.target.files[0];

    if(selectedFile && types.includes(selectedFile.type)) {

setImg(selectedFile);
setError('')

    }else {
setImg(null);
setError('please select a valid image type png or jpeg or jpg');


    }

}




const handleSubmit=(e)=> {
    e.preventDefault();
    setLoader(true);
    
 
    const uploadTask = storage.ref(`images/${photo.name}`).put(photo);
    uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(progress);
    }, err => setError(err.message)
        , () => {
            storage.ref('images').child(photo.name).getDownloadURL().then(url => {   




    db.collection('members')
.add({
    fname:fname,
    lname:lname,
    phone:phone,
    email:email,
    district:district,
    country:country,
    photo: url,


})
.then(()=> {
    alert('Thanks for registering!!!')
    setLoader(false);
    setError('');
    setFname('');
    setLname('');
    setPhone('');
    setEmail('');
    setCountry('');
    setDistrict('');
    document.getElementById('file').value = '';

}).catch((error)=> {
    alert(error.message);
    setLoader(false);
})


})

})

}















    return (
        <div>
        <div className={styles.register}>

            <div className={styles.contactform}>
            
            <h2>Register form for Epl ramailo league</h2>
            <form onSubmit={handleSubmit}>
                 
                        <div >
                            <input type="text"  placeholder="First Name" name="fname" required minLength='2' maxLength='20' 
                            name='fname' value={fname} 
                            onChange={(e)=> setFname(e.target.value)}
                          />



                            <input type="text"  placeholder="Last Name" name="lname" required minLength='2' maxLength='20'
                             name='lname' value={lname} 
                             onChange={(e)=> setLname(e.target.value)}
                            />
                        </div>
                        <div >
                            <input type="text" placeholder="Phone No"  required minLength='8' maxLength='14'
                             name='phone' value={phone} 
                             onChange={(e)=> setPhone(e.target.value)}
                            />


                            <input type="email" placeholder="Email"  required 
                             name='email' value={email}
                             onChange={(e)=> setEmail(e.target.value)}
                            
                            />
                        </div>
                        <div >
                            <input type="text"  placeholder="Country"  minLength='2' maxLength='40'
                             name='district' value={district} 
                             onChange={(e)=> setDistrict(e.target.value)}
                            />
                            <input type="text"  placeholder="District"  minLength='2' maxLength='40'
                             name='country' value={country} required 
                             onChange={(e)=> setCountry(e.target.value)}
                            />
                         
                    
                        </div>
                        <div>
                            <p>File for ...</p>
                        <input type="file"   id='file' onChange={ImgHandler}     />
                    
                         
                           
                         </div>

                        <div>
                          <button type='submit' >Submit</button><br/>

                        </div>
                   
                </form>
                </div>


        </div>

        </div>
    )
}
