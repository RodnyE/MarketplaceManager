
module.exports = {
    PORT: process.env.PORT || 3000,
    isProduction: process.env.NODE_ENV === "production",
    
    DIR: __dirname, 
    SERV: __dirname + "/serv",
    DIST: __dirname + "/dist", 
    SRC: __dirname + "/src",
};