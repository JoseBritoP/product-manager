import swaggerJSDoc from 'swagger-jsdoc'

const options:swaggerJSDoc.Options = {
  swaggerDefinition:{
    openapi:'3.0.2',
    tags:[
      {
        name:"Products",
        description:"API CRUD Operations related to products"
      }
    ],
    info:{
      title:"REST API Node.js / Express / TypeScript",
      version:"1.0.0",
      description:"API Docs for Products"
    }
  },
  apis:['./src/routes/productRouter.ts']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec