using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ClipWall.Models;

namespace ClipWall.Controllers
{
    public class DocumentController : ApiController
    {
        public IEnumerable<Document> PostMoreDocuments()
        {
            //return DocumentRepository.GetData(pageNo, pageSize);
            return DocumentRepository.GetData(1, 20);
        }
    }
}
