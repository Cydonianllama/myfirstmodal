const btnOpenModal = document.getElementById('myfirstmodal');
const modal = document.querySelectorAll('.modal');
const main = document.querySelector('main');

const containerProducts = document.getElementById('container-products');
const btnCreateProduct = document.getElementById('btn-create-product');
const btnEditSaveProduct = document.getElementById('btn-edit-save');

const nameProductItem = document.getElementById('name-product-item_');
const quantityProductItem = document.getElementById('quantity-product-item_')

const modalNameProduct = document.querySelector('#modal-name-product');
const modalQuantityProduct = document.querySelector('#modal-quantity-product');
const myModal = document.getElementById('mymodal')

var arrayProductObject = []
var arrayProductsComponents = []

// binding with the modal edit
const listenerComponentsProduct = () => {

    const actionsBinding = (component) => {
        //set the id of the product
        myModal.dataset.currentActive  = component.dataset.id;
        //set the values in the input
        arrayProductsComponents.forEach( productComponent => {
            if ( productComponent.id === component.dataset.currentActive ){
                modalNameProduct.value = productComponent.name;
                modalQuantityProduct.value = productComponent.quantity;
            }
        })
    }

    const actionsNoBinding = (component) => {
        //clear the id stored
        myModal.dataset.currentActive = "";
        // clear inputs
        modalNameProduct.value = "";
        modalQuantityProduct.value = "0";
    }

    const toogleComponentAction = (component) => {
        if (component.dataset.active === "false"){
            //binding
            actionsBinding(component)
            component.dataset.active = "true";
        }else{
            //no binding
            actionsNoBinding(component);
            component.dataset.active = "false";
        }
    }
    
    if (arrayProductsComponents.length > 0) {
        let productComponent = document.querySelectorAll('.product-component');
        productComponent.forEach(component => {
            component.addEventListener('click', (event) => {
                const currentComponent = event.target;

                toogleComponentAction(currentComponent);
                
                event.preventDefault();
            })
        })
    }
}

function renderAllProducts(){

    // this store the templates temporaly
    var listComponents = ``;

    // get the templates of the components
    arrayProductsComponents.forEach(component => {
        listComponents = listComponents + component.render();
    })

    // show the templates
    containerProducts.innerHTML = listComponents;

    //binding component with the modal options
    listenerComponentsProduct();
}

function generateComponentProduct(name,quantity){
    return new productComponent(name,quantity);
}

function createProduct(name,quantity){
    return new product(name,quantity);
}

class productComponent{

    render(){
        return `
            <div class = "product-component" data-id = "${this.id}" data-active="false" >
                ${this.name} + ${this.quantity}
            </div>`;
    }

    generateId(){
        let idGenerated = Math.floor(Math.random() * 10000);
        return idGenerated.toString();
    }

    getPos(){
        //still in development
    }

    updatePosition(newPos){
        //still in development 
    }

    constructor(name,quantity,position,idComponent){
        this.name = name;
        this.quantity = quantity;
        this.id = this.generateId();
    }
}

class product{
    constructor(name,quantity,id){
        this.name = name;
        this.quantity = quantity;
        this.id = id;
    }
}

const createProductAction = (event) => {
    
    // values of the form
    let nameProduct = nameProductItem.value;
    let quantityProduct = quantityProductItem.value;

    // creations
    var productComponent = generateComponentProduct(nameProduct, quantityProduct)
    var productItem = createProduct(nameProduct,quantityProduct,productComponent.id)

    // adders
    arrayProductObject.push(productItem);
    arrayProductsComponents.push(productComponent);

    //bindings


    // final render
    renderAllProducts();

    event.preventDefault();
}

const openModalAction = (event) => {
    
    // cached the id of the modal
    const idModal = event.target.id;
    
    // this cached the current modal object
    var currentItem = "";

    // 1 - show the modal
    const showModal = (idModal) => {

        // we could have many models in our app
        modal.forEach(item => {

            if (item.dataset.nameModal === idModal) {

                //set visible the current modal
                item.classList.add('transition');
                item.classList.remove('transition-close')

                //alter background of the main container
                main.style.opacity = "0.2";

                //set the current item for add the click listener form the close button
                currentItem = item; 
            }

        })
    }

    // 2 - active the close methods
    const activeCloseMethods = () => {

        //cached the btn close of the modal
        const btnClose = document.getElementById('btn-close');

        const closeAction = () => {
            //hide the current modal
            currentItem.classList.add('transition-close');
            currentItem.classList.remove('transition');
            

            //restore the background of main container
            main.style.opacity = "1";
        }   

        btnClose.addEventListener('click', (event) => {

            closeAction();
            
            event.preventDefault();
        })

    }

    // 3 - active edit and save
    const activeSaveAndEdit = () => {

        const saveAndEditAction = (event) => {
            
            modal.forEach(modal => {

                //the id of the current modal
                if (modal.dataset.nameModal === idModal){
                    arrayProductsComponents.forEach(comp => {
                        console.log(modal.dataset.currentActive ,"  -  ",comp.id)
                        if (modal.dataset.currentActive === comp.id){
                            comp.name = "cocodrilo";
                        }

                        console.log(comp)
                    })
                }
            });

            renderAllProducts();

            event.preventDefault();
        }

        btnEditSaveProduct.addEventListener('click', saveAndEditAction);
    }

    //process flow 
    showModal(idModal);
    activeCloseMethods();
    activeSaveAndEdit();

    event.preventDefault();
}

// this contains all the listener of our app
function listeners(){
    //open modal 
    btnOpenModal.addEventListener('click',openModalAction);
    btnCreateProduct.addEventListener('click',createProductAction);
}

// this container all the functionalities of the app
function app(){
    //all the listeners in our app
    listeners();
}

// the main declaration of the app
app();