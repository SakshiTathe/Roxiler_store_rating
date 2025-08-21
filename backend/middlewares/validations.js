module.exports = {
    ValidateName:(name)=>{
        if (!name) return false;
        return name.length >= 20 && name.length <= 60;
    },
    ValidateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    ValidatePassword: (password)=>{
        if(password.length < 8 || password.length >16){
            return "Password must be at least 8 characters long "
        }
        const hasUppercase = /[A-Z]/.test(password);
        if (!hasUppercase) {
            return "Password must contain at least one uppercase letter.";
        }
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
        if (!regex) {
            return "This string has no special characters.";
        }
        return null
    },
    ValidateAddress:(address)=>{
        return address && address.length < 400;
    }
}
