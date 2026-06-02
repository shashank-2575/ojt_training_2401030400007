import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/style1.css';

const SignIn = () => {
    const { user, loginUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    // Redirect to profile if already signed in
    useEffect(() => {
        if (user.signedIn) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const validateEmail = (input) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(input.toLowerCase());
    };

    const handleContinue = (e) => {
        if (e) e.preventDefault();
        
        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);

        // Extract display name from email prefix
        const name = email.split('@')[0]
            .replace(/[._]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

        loginUser(name, email);
        navigate('/profile');
    };

    const handleGoogleSignIn = () => {
        loginUser('Google User', 'user@gmail.com');
        navigate('/profile');
    };

    const handleFacebookSignIn = () => {
        loginUser('Facebook User', 'user@facebook.com');
        navigate('/profile');
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="heading" style={{ color: '#002080', fontWeight: 'bold' }}>MakerBazar.in</div>
                <h2>Sign in</h2>
                <div className="line">Sign in or create an account</div>

                <div className="login-buttons-row">
                    <button onClick={handleGoogleSignIn} title="Sign In with Google">
                        <img 
                            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" 
                            alt="Google" 
                            className="google-icon"
                            style={{ width: '22px', height: '22px' }}
                        />
                    </button>
                    <button onClick={handleFacebookSignIn} title="Sign In with Facebook">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png" 
                            alt="Facebook" 
                            className="facebook-icon"
                            style={{ width: '28px', height: '28px' }}
                        />
                    </button>
                </div>

                <div className="seprate">
                    <hr /><p style={{ padding: '0 10px', color: 'gray' }}>or</p><hr />
                </div>

                <form onSubmit={handleContinue}>
                    <div className="input-group-custom">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleContinue(e);
                            }}
                        />
                        {emailError && (
                            <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>
                                Please enter a valid email address.
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn-signin">
                        <span>Continue</span>
                    </button>
                </form>

                <div className="terms">
                    By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    );
};

export default SignIn;
