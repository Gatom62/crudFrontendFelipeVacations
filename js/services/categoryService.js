//Aqui va la url de la API, no los enpoints especificos
const API_URL = "http://localhost:8080/api/category";

//Optener datos
export async function getCategories(){
    const res = await fetch(`${API_URL}/getDataCategories`);
    return res.json();
}

//Crear categorias
export async function createCategory(data){
    await fetch(`${API_URL}/newCategory`, {
        //Metodo para crear datos
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)     
    });
}

//Actualizar categorias
export async function updateCategory(id, data) {
    await fetch(`${API_URL}/updateCategory/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

//Eliminar categoria
export async function deleteCategory(id) {
    await fetch(`${API_URL}/deleteCategory/${id}`, {
        method: "DELETE"
    });
}