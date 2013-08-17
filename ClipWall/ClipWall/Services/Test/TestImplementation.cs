// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TestImplementation" company="ClipWall">
//     Copyright (c) ClipWall. All rights reserved.
// </copyright>
// <author>Shawn Cao</author>
// <date>8/16/2013 6:08:05 PM</date>
// --------------------------------------------------------------------------------------------------------------------

namespace ClipWall.Services.Test
{
    public class TestImplementation : ITestInterface
    {
        public string GetName()
        {
            return "I'm testing IOC";
        }
    }
}