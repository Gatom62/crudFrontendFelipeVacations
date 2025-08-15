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

    //Despues de cargar las constantes, cargamos los registros
    loadCategories();

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

            //Por cada categoria dentro de este arreglo va a ocurrir algo...
            categories.forEach((cat)=> {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                <td>${cat.idCategoria}</td>
                <td>${cat.nombreCategoria}</td>
                <td>${cat.descripcion || "Descripcion no asignada"}</td>
                <td>${cat.fechaCreacion || ""}</td>
                <td>
            <button class="btn btn-sm btn-outline-secondary edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-square-pen">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>
            </button>
 
            <button class="btn btn-sm btn-outline-danger delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-trash">
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    <path d="M3 6h18"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
                </td>
                `;

                //Funcionalidada para el btn de edtiar
                tr.querySelector(".edit-btn").addEventListener("click", ()=> {
                    
                    //Pasamos los datos del JSON a los campos del formulario
                    form.categoryId.value = cat.idCategoria;
                    form.categoryName.value = cat.nombreCategoria;
                    form.categoryDescription.value = cat.descripcion;

                    //Aqui le ponemos el titulo al formulario
                    lbModal.textContent = "Editar Categoría";

                    //Cerramos el modal
                    modal.show();
                });

                //Funcionalidad del boton de aliminar categoria
                tr.querySelector(".delete-btn").addEventListener("click", async () => {
                    if (confirm("¿Desea eliminar la categoría?")) {
                      await deleteCategory(cat.idCategoria);
                      await loadCategories();
                    }
                  });          

                tableBody.appendChild(tr); //Al thbody le agrega el tr cradi
                    
            });

        }
        catch(err){
            console.error("Erorr cargando categrías 😑: ", err)
        }
    }
});