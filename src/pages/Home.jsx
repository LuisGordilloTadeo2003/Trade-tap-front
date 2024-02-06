import { useEffect } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';

import GuestNavbar from '../components/ui/GuestNavbar';
import Navbar from '../components/ui/Navbar';
import MainContent from './MainContent';
import Footer from '../components/ui/Footer';


export default function Home() {
    const { user,  sessionVerified, sendEmailVerificationLink, status, loading } = useAuthContext();
    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    let navbar;

    if(!user){
      navbar = <GuestNavbar/>
    }else{
      navbar = <Navbar/>
    }
    return (<>
       <div className="row mb-4">
                {navbar}
              </div>
              <div className="row">
                <MainContent />
              </div>
              <div className="row mt-4">
                <Footer />
              </div>

      {/* {!user?.email_verified_at && (<div className="my-10 p-4 bg-indigo-600 text-indigo-50 rounded-xl flex items-center gap-x-10">
          <p className="text-sm font-bold">Please verify your email address.</p>
          <button className="ring-1 ring-indigo-50 py-1.5 px-4 rounded-full hover:bg-white hover:text-indigo-600 text-lg flex items-center gap-x-2 disabled:cursor-not-allowed" onClick={sendEmailVerificationLink} disabled={loading}>
            {loading && <Spinner loading={loading}/>}
            <span>Verify</span>
          </button>
        </div>)} */}
    </>);
}
