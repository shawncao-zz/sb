// --------------------------------------------------------------------------------------------------------------------
// <copyright file="MvcApplication" company="ClipWall">
//     Copyright (c) ClipWall. All rights reserved.
// </copyright>
// <author>Shawn Cao</author>
// <date>8/16/2013 5:16:24 PM</date>
// --------------------------------------------------------------------------------------------------------------------

namespace ClipWall
{
    using System;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;
    using Framework;

    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : WebApplication
    {
        protected override void OnApplicationStarted()
        {
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();
        }

        void Application_BeginRequest(object sender, EventArgs e)
        {
            if (Request.Url.PathAndQuery == "/loader")
            {
                Context.RewritePath("~/scripts/clip/loader.js");
            }
        }
    }
}