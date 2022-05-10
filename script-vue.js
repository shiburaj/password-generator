const { createApp } = Vue


createApp({
    data() {
        return {
            length: 8,
            uppercase: false,
            lowercase: true,
            numbers: true,
            symbols: false,
            password: '',
            show: false,
        }
    },
    computed: {
        get_password() {
            if(this.show) {
                return this.password
            }
            return ''.padStart(this.length, '*')
        },
        get_strength() {
            let strength = 0;
            if(this.password.length < 8) {
                strength = 0;
            } else if(this.password.length >= 8 && this.password.length < 12) {
                strength = 1;
            } else if(this.password.length >= 12 && this.password.length < 16) {
                strength = 2;
            } else if(this.password.length >= 16 && this.password.length < 20) {
                strength = 3;
            } else if(this.password.length >= 20) {
                strength = 4;
            }
            if(this.uppercase) {
                strength++;
            }
            if(this.lowercase) {
                strength++;
            }
            if(this.numbers) {
                strength++;
            }
            if(this.symbols) {
                strength++;
            }
            return strength;

        },
        get_strength_text() {
            let strength = this.get_strength;
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
    },
    methods: {
        generatePassword() {
            const { length, uppercase, lowercase, numbers, symbols } = this

            const charset = {
                uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                lowercase: 'abcdefghijklmnopqrstuvwxyz',
                numbers: '0123456789',
                symbols: '!@#$%^&*()[]',
            }
            let stub_length = 0;
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
            this.password = this.takeRandom(password, length);
        },
        takeRandom(chars, length) {
            const password = []
            for (let i = 0; i < length; i++) {
                const random = Math.floor(Math.random() * chars.length)
                password.push(chars[random])
            }
            return password.join('')
        },
        
        async copyPassword() {
            try {
              await navigator.clipboard.writeText(this.password);
            } catch($e) {
              alert('Cannot copy');
            }
        }
    },


}).mount('#app');