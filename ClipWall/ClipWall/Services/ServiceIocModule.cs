// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ServiceIocModule" company="ClipWall">
//     Copyright (c) ClipWall. All rights reserved.
// </copyright>
// <author>Shawn Cao</author>
// <date>8/16/2013 6:09:06 PM</date>
// --------------------------------------------------------------------------------------------------------------------

namespace ClipWall.Services
{
    using Test;
    using Ninject.Modules;

    public class ServiceIocModule : NinjectModule
    {
        public override void Load()
        {
            this.Bind<ITestInterface>().To<TestImplementation>().InSingletonScope();
        }
    }
}