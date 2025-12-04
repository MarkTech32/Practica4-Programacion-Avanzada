using Microsoft.AspNetCore.Mvc;

namespace CRUD_API_MongoDB.Controllers
{
    public class ClientesController : Controller
    {
        public IActionResult Listado()
        {
            return PartialView("_Listado");
        }

        public IActionResult Insertar()
        {
            return PartialView("_Insertar");
        }

        public IActionResult ActualizarEliminar()
        {
            return PartialView("_ActualizarEliminar");
        }
    }
}