using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace easyBike.Api
{
    public static class HttpHelper
    {
        public class imageData
        {
            public string imageDir { get; set; }
            public string imageUrl { get; set; }
        }

        private static IHttpContextAccessor HttpContextAccessor;
        private static IHostingEnvironment hostingEnvironment;
        public static void Configure(IHttpContextAccessor httpContextAccessor, IHostingEnvironment hostEnvironment)
        {
            HttpContextAccessor = httpContextAccessor;
            hostingEnvironment = hostEnvironment;
        }

        public static HttpContext HttpContext
        {
            get
            {
                return HttpContextAccessor.HttpContext;
            }
        }

        public static string getServerRequestUrl()
        {
            var request = HttpContext.Request;

            return string.Format("{0}://{1}{2}{3}", request.Scheme, request.Host, request.Path, request.QueryString);
        }

        public static string getServerUrl()
        {
            var request = HttpContext.Request;

            return string.Format("{0}://{1}", request.Scheme, request.Host);
        }
        private const string IMG_DIR = "{0}/images/{1}{2}.png";

        public static imageData getImageName(string subFix)
        {
            var fileName = Path.GetRandomFileName();

            return new imageData()
            {
                imageDir = string.Format(IMG_DIR, hostingEnvironment.ContentRootPath, subFix, fileName),
                imageUrl = string.Format(IMG_DIR, HttpHelper.getServerUrl(), subFix, fileName)
            };
        }

        private const string ELAC_IMG_DIR = "{0}/elacImages/{1}{2}.png";
    
        public static imageData getElacImageName(string subFix)
        {
            var fileName = Path.GetRandomFileName();            

            return new imageData()
            {
                imageDir = string.Format(ELAC_IMG_DIR, hostingEnvironment.ContentRootPath, subFix, fileName),
                imageUrl = string.Format(ELAC_IMG_DIR, HttpHelper.getServerUrl(), subFix, fileName)
            };
        }
    }
}