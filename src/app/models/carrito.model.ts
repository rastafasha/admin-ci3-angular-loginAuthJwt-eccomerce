export class Carrito{
    constructor(
        public id: number,
        public producto: string,
        public user: string,
        public cantidad: number,
        public color: string,
        public selector: string,
        public precio: number,
    ){
    }
}
