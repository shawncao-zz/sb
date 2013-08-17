// --------------------------------------------------------------------------------------------------------------------
// <copyright file="SomethingUseTest" company="ClipWall">
//     Copyright (c) ClipWall. All rights reserved.
// </copyright>
// <author>Shawn Cao</author>
// <date>8/16/2013 6:13:10 PM</date>
// --------------------------------------------------------------------------------------------------------------------

namespace ClipWall.Services.Test
{
    public class SomethingUseTest
    {
        public SomethingUseTest(ITestInterface test)
        {
            this.TestName = test.GetName();
        }

        public string TestName { get; private set; }
    }
}