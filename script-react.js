const root = ReactDOM.createRoot(document.getElementById('root'));


const CopyPasswordButton = ({password,copyPassword}) => {
    if(password == '') {
        return null;
    }

    return (
        <button onClick={copyPassword} className="bg-gray-500 hover:bg-gray-600 text-blue-50 p-3 rounded-b-xl flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy</span>
        </button>
    );
}

const ShowHideButton = ({show,showHidePassword}) => {
    return (
        <button onClick={showHidePassword} className="bg-gray-500 hover:bg-gray-600 text-blue-50 p-3 rounded-b-xl flex gap-2">
            { !show 
            ?  <div className="flex gap-2">
                    <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span >Show</span>
                </div>
            : 
            <div className="flex gap-2">
                <svg  xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <span >Hide</span>
            </div>
            }
        </button>
    );
}

const ShowPasswordElement = ({password,show,showHidePassword, copyPassword, strength}) => {
    if(password == '') {
        return null;
    }
    let show_password = show ? password : ''.padStart(password.length, '*');
    return (
        <div>
            <div  className="flex flex-col justify-center items-center bg-blue-300 p-3">
                <div className="w-full border-2 border-blue-200 rounded-xl pb-3 pt-6 px-3 shadow leading-0 mb-5">
                    <h1 className="text-center text-6xl text-blue-100 w-full">{ show_password }</h1>
                </div>
                
                <ShowPasswordStrength password={password} strength={strength} />
                
            </div>
            <div className="flex justify-between">
                <CopyPasswordButton password={password} copyPassword={copyPassword} />
                <ShowHideButton show={show} showHidePassword={showHidePassword} />
            </div>
        </div>
        
    );
}

class ShowPasswordStrength extends React.Component {
    constructor(props) {
        super(props);
    }

    get_strength_text() {
        let strength = this.props.strength;
        if(strength <= 0) {
            return 'Poor';
        } else if(strength <= 1) {
            return 'Weak';
        } else if(strength <= 2) {
            return 'Medium';
        } else if(strength <= 3) {
            return 'Ok';
        } else if(strength <= 4) {
            return 'Strong';
        } else if(strength <= 5) {
            return 'Very Strong';
        } else {
            return 'Extremely Strong';
        }
    }

    render() {

        return (
            <div>
                <div className="flex justify-center items-center mb-1 gap-1">
                    { this.props.strength > 0 && 
                    <span className="w-6 h-6 bg-red-800 border border-red-800 shadow shadow-red-100 rounded-full"></span>
                    }
                    { this.props.strength > 1 && 
                    <span  className="w-6 h-6 bg-red-500 border border-red-800 shadow shadow-red-100 rounded-full"></span>
                    }
                    { this.props.strength > 2 && 
                    <span  className="w-6 h-6 bg-yellow-500 border border-yellow-800 shadow shadow-yellow-100 rounded-full"></span>
                    }
                    { this.props.strength > 3 && 
                    <span className="w-6 h-6 bg-yellow-300 border border-yellow-800 shadow shadow-yellow-100 rounded-full"></span>
                    }
                    { this.props.strength > 4 && 
                    <span  className="w-6 h-6 bg-green-500 border border-green-800 shadow shadow-green-500 rounded-full"></span>
                    }
                    { this.props.strength > 5 && 
                    <span  className="w-6 h-6 bg-green-300 border border-green-800 shadow shadow-green-300 rounded-full"></span>
                    }
                </div>
                <div className="text-center mb-0">
                    <small className="text-xs text-gray-600 font-bold">{ this.get_strength_text() }</small>
                </div>
            </div>
        );
    }
}

const LengthElement = ({length,handleChange}) => {
    return (
        <div className="w-full flex justify-center my-4 mx-3">
            <label htmlFor="length" className="italic mx-3">Length</label>
            <input type="range" onChange={handleChange} className="w-full" name="length" id="length" value={length} min="3" max="25" />
            <label htmlFor="length" className="italic mx-3">{ length }</label>
        </div>
    );
}

const CheckboxElement = ({name,status,handleToggle}) => {
    return (
        <div className="w-1/2">
            <input type="checkbox" className="mr-1 " name={name} id={name} checked={status}  onChange={handleToggle} />
            <label htmlFor={name}>{ name }</label>
        </div>
    );
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 8,
            uppercase: false,
            lowercase: true,
            numbers: true,
            symbols: false,
            password: '',
            strength: 0,
            show: false,
        };
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    handleToggle = (event) => {
        this.setState({
            [event.target.name]: event.target.checked,
        });
    }
    
    showHidePassword = () => {
        this.setState((prevState) => ({
            show: !prevState.show,
        }));
    }

    generatePassword = (e) => {
        e.preventDefault();
        const { length, uppercase, lowercase, numbers, symbols } = this.state;

        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()[]',
        }
        
        let password = '';
        if (uppercase) {
            password += this.takeRandom(charset.uppercase, length);
        }
        if (lowercase) {
            password += this.takeRandom(charset.lowercase, length);
        }
        if (numbers) {
            password += this.takeRandom(charset.numbers, length);
        }
        if (symbols) {
            password += this.takeRandom(charset.symbols, length);
        }
        password = this.takeRandom(password, length);
        this.setState({
            password
        });
        this.calculatePasswordStrength();
    }

    takeRandom = (chars, length) => {
        const password = []
        for (let i = 0; i < length; i++) {
            const random = Math.floor(Math.random() * chars.length)
            password.push(chars[random])
        }
        return password.join('')
    }

    copyPassword = async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(this.state.password);
        } catch($e) {
          alert('Cannot copy');
        }
    }

    calculatePasswordStrength() {
        let strength = 0;
        if(this.state.password.length < 8) {
            strength = 0;
        } else if(this.state.password.length >= 8 && this.state.password.length < 12) {
            strength = 1;
        } else if(this.state.password.length >= 12 && this.state.password.length < 16) {
            strength = 2;
        } else if(this.state.password.length >= 16 && this.state.password.length < 20) {
            strength = 3;
        } else if(this.state.password.length >= 20) {
            strength = 4;
        }
        if(this.state.uppercase) {
            strength++;
        }
        if(this.state.lowercase) {
            strength++;
        }
        if(this.state.numbers) {
            strength++;
        }
        if(this.state.symbols) {
            strength++;
        }
        this.setState((prevState) => ({
            strength,
        }));
    }
    

    render() {
        return (
            <div className="container">
                <div className="flex justify-center mb-5">
                    <h1 className="text-4xl text-blue-800 font-bold text-center px-3">Strong <span className="text-green-500">Password</span> Generator</h1>
                </div>
                <form className="flex justify-center flex-wrap text-xl bg-blue-200 sm:rounded-t-xl p-3">
                    <LengthElement length={this.state.length} handleChange={this.handleChange} />
                    <div className="flex flex-wrap">
                        <CheckboxElement name="uppercase" status={this.state.uppercase} handleToggle={this.handleToggle} />
                        <CheckboxElement name="lowercase" status={this.state.lowercase} handleToggle={this.handleToggle} />
                        <CheckboxElement name="numbers" status={this.state.numbers} handleToggle={this.handleToggle} />
                        <CheckboxElement name="symbols" status={this.state.symbols} handleToggle={this.handleToggle} />
                    </div>
                    <div className="flex justify-center my-5">
                        <button onClick={this.generatePassword} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate</button>
                    </div>
                </form>
                <ShowPasswordElement show={this.state.show} password={this.state.password} showHidePassword={this.showHidePassword} copyPassword={this.copyPassword} strength={this.state.strength} />
                
            </div>
        );
    }
}
root.render(<App />);