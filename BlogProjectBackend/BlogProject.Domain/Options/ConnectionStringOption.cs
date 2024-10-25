using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogProject.Domain.Options
{
    public class ConnectionStringOption
    {
        public const string Key = "ConnectionStrings";
        public string SqlServer { get; set; } = default!;
    }
}
