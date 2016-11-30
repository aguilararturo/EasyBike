using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace easyBikeApi.Utils
{
    public class ImageUtility
    {
        public static void SaveImage(string filePath, string imageBase64)
        {                     
            var bytes = Convert.FromBase64String(imageBase64);
            using (var imageFile = new FileStream(filePath, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
        }
    }
}
