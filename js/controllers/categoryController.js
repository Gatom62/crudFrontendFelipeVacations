//Importamos los metodos que utilizaremos
import {
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory
} from "../services/categoryService.js";

document.addEventListener("DOMContentLoaded", ()=>{
    const tableBody = document.querySelector("#categoriesTable tbody");
    const form = document.getElementById("categoryForm");
    const modal = new bootstrap.Modal( document.getElementById("categoryModal"));
    const lbModal = document.getElementById("categoryModalLabel");
    const btnAdd = document.getElementById("btnAddCategory");

    //Agregamos un evento click al boton de agregar categoria
    btnAdd.addEventListener("click", ()=> {
        form.reset();
        form.categoryId.value = ""; //Al agregar no necesitamos un id
        lbModal.textContent = "Agregar Categoría";
        modal.show();
    });

    //Para los eventos del formulario
    form.addEventListener("submit", async (e)=> {
        //Evita que el formulario se envie
        e.preventDefault();
        const id = form.categoryId.value; //Se obtiene el id guardado en el form
        
        const data = {
            nombreCategoria: form.categoryName.value.trim(),
            descripcion: form.categoryDescription.value.trim()
        };
        
        try{
            //Si hay id, hay actualización
            if(id){
                await updateCategory(id, data);
            }
            //Si no hay, entonces agregamos C:
            else{
                await createCategory(data);
            }
            modal.hide();
            await loadCategories();
        }
        catch(err){
            console.error("Error al guardar la categoria: ", err);
        }
    });

    //Para cargar las categorias, eliminar y actualizar
    async function loadCategories() {
        try{
            const categories = await getCategories();
            tableBody.innerHTML = ''; //Vaciamos eñ tbody

            //Verifica si no hay categorias registradas
            if(!categories || categories.length == 0){
                tableBody.innerHTML = '<td colspan="5">Actualmente no hay registros</td>';
                return; //El codigo deja de ejecutrarse
            }
            
            
        }
        catch(err){
            
        }
    }
});