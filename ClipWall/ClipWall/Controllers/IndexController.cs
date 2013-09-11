using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ClipWall.Models;

namespace ClipWall.Controllers
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/

        public ActionResult Index()
        {
            return View(DocumentRepository.GetData(1, 20));
        }

    }
}
