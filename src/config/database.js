module.exports = {
      url: process.env.DATABASE_URL ||  
    "postgres://postgres:bcd127@35.153.207.23:5432/db_guardian", 
      config: { 
        dialect: "postgres",
        "dialectOptions": {
            "ssl": {
                require: true,
                rejectUnauthorized: false
            }
        },          
        logging: console.log, 
        define: { 
          timestamp: true, 
          underscored: true, 
        }, 
    }, 
}; 
