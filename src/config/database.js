module.exports =  { 
      url: process.env.DATABASE_URL ||  
    "postgres://postgres:bcd127@localhost:5432/db_guardian", 
      config: { 
        dialect: "postgres", 
        logging: console.log, 
        define: { 
          timestamp: true, 
          underscored: true, 
        }, 
    },     
}; 