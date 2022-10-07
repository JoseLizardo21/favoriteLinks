const bcryp = require('bcryptjs');

const helpers = {
}
helpers.encrypPassword = async (password)=>{
    const salt = await bcryp.genSalt(10);
    const hast = await bcryp.hash(password, salt);
    return hast;
};

helpers.matchPassword = async (password, savePassword)=>{
    try {
        return await bcryp.compare(password, savePassword);
    } catch (error) {
        console.log('ocurrio un error');       
    }
};

module.exports = helpers;