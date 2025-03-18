export const checkValidData = (email, password) => {

    // if(email == "") return "Email ID is required!";

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    if(email == "") return "Email ID is required!";
    if(!isEmailValid) return "Email ID is not valid!";

    if(!isPasswordValid) return "Password is not valid!";

    return null;

}