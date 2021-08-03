class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        cats: "http://localhost:8080/api/cats/",
        client:  "http://localhost:8080/api/client/",
        images: "http://localhost:8080/api/cats/images/",
        customers: "http://localhost:8080/api/customers/cats/",
        employees: "http://localhost:8080/api/employess/cats/"

        // kittens: "https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json"
        // image: "http://localhost:8080/api/cats/images/"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        cats: "http://localhost:8080/api/cats/",
        client:  "http://localhost:8080/api/client/",
        images: "http://localhost:8080/api/cats/images/",
        customers: "http://localhost:8080/api/customers/cats/",
        employees: "http://localhost:8080/api/employess/cats/"
        
        // image: "http://localhost:8080/api/cats/images/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;