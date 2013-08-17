// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebApplication" company="ClipWall">
//     Copyright (c) ClipWall. All rights reserved.
// </copyright>
// <author>Shawn Cao</author>
// <date>8/16/2013 5:16:24 PM</date>
// --------------------------------------------------------------------------------------------------------------------

namespace ClipWall.Framework
{
    using System.Reflection;
    using Ninject;
    using Ninject.Web.Common;

    public class WebApplication : NinjectHttpApplication
    {
        protected override IKernel CreateKernel()
        {
            var kernal = new StandardKernel();

            // do we need to load other dependent assemblies?
            kernal.Load(Assembly.GetExecutingAssembly());
            return kernal;
        }
    }
}