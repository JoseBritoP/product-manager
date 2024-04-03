export type NewProduct = {
  name:string
  price:number
}

export type ProductType = {
  id:string,
  name:string,
  price:number,
  inStock:boolean,
  deleted?:boolean
}

export type UpdateProduct = {
  id:string,
  data:{
    name?:string,
    price?:number
  }
};