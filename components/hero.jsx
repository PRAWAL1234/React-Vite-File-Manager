
import React, { useState, useEffect } from 'react';


function Hero() {
  const [currentFiles, setCurrentFiles] = useState({});
  const [paths, setPaths] = useState([]);

  const drive = JSON.parse(localStorage.getItem("drive"));
  useEffect(() => {
    let currentFilesTemp = drive;
    for (let i = 1; i < paths.length; i++) {
      currentFilesTemp = currentFilesTemp[paths[i]].files;
    }
    setCurrentFiles(currentFilesTemp);
  }, [paths]);

  

  // DELETE Function
  function delete1(key)
      {
        let currentFiles = drive;
        let i;
        for (i = 1; i < paths.length; i++) currentFiles = currentFiles[paths[i]].files;

       
        delete currentFiles[key];
        localStorage.setItem(
          "drive",
          JSON.stringify({ ...drive })
        );
        window.location.reload();
      }


      // breadcrumb

      function updatePath(key) {
        paths.push(key);
        breadcrumb = document.getElementById("paths");
        let path;

        for (path of paths)
          breadcrumb.innerHTML +=` <li class="breadcrumb-item ${paths[paths.length-1]==path ? 'text-primary':''}" aria-current="page" onclick="goToPath('${path}')">${path}</li>`;
        updateFileStructure();
      }



      function goToPath(path)
      {
        index= paths.indexOf(path)
        paths= [...paths.splice(0,index)]
        updatePath(path)
      }


      
  return (
    <>

    {/* breadcrumbs */}

    <div className=" bg-slate-700 mt-5 px-10 py-4 text-white breadcrumbs text-sm">
        <ul id='paths'>
          <li><a>Home</a></li>
        </ul>        
    </div>
 
    <div className="overflow-x-auto p-5">
      <table className="table " id='table'>
      <tbody>
        {/* Object.keys(currentFiles): Yeh function currentFiles object ke keys ko ek array mein return karta hai. */}

        {/* map((key) => { ... }): Yeh function har key ke liye ek function ko call karta hai, jo ki ek table row ko return karta hai. */}

        {/* key => { ... }: Yeh arrow function har key ke liye ek table row ko return karta hai. */}

        {Object.keys(currentFiles).map((key) => (
          
          <tr key={key} className='cursor-pointer'>

            <td onClick={() => updatePath(key)}>
              {currentFiles[key].type === "folder" ? (<span>&#128193; {key}</span>) : (<span>&#128196; {key}</span>)}
            </td>
            
            <td>

            </td>
            <td>
              <button
                className="btn btn-danger bg-red-700 text-white border"
                onClick={() => delete1(key)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>


    
    </>
  );
}

export default Hero;